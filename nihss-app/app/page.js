'use client'

import styles from "./page.module.css";
import NIHSS from "./nihss.json";
import { useState, useEffect, use } from 'react'
// import { subscribeUser, unsubscribeUser, sendNotification } from './actions'

// function urlBase64ToUint8Array(base64String) {
//     const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
//     const base64 = (base64String + padding)
//         .replace(/\\-/g, '+')
//         .replace(/_/g, '/')

//     const rawData = window.atob(base64)
//     const outputArray = new Uint8Array(rawData.length)

//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i)
//     }
//     return outputArray
// }

// function PushNotificationManager() {
//     const [isSupported, setIsSupported] = useState(false);
//     const [subscription, setSubscription] = useState(null);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         if ('serviceWorker' in navigator && 'PushManager' in window) {
//             setIsSupported(true);
//             registerServiceWorker();
//         }
//     }, []);

//     async function registerServiceWorker() {
//         const registration = await navigator.serviceWorker.register('/sw.js', {
//             scope: '/',
//             updateViaCache: 'none',
//         });
//         const sub = await registration.pushManager.getSubscription();
//         setSubscription(sub);
//     }

//     async function subscribeToPush() {
//         const registration = await navigator.serviceWorker.ready;
//         const sub = await registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: urlBase64ToUint8Array(
//                 process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
//             ),
//         });
//         setSubscription(sub);
//         await subscribeUser(sub);
//     }

//     async function unsubscribeFromPush() {
//         await subscription?.unsubscribe();
//         setSubscription(null);
//         await unsubscribeUser();
//     }

//     async function sendTestNotification() {
//         if (subscription) {
//             await sendNotification(message);
//             setMessage('');
//         }
//     }

//     if (!isSupported) {
//         return <p>Push notifications are not supported in this browser.</p>;
//     }

//     return (
//         <div>
//             <h3>Push Notifications</h3>
//             {subscription ? (
//                 <>
//                     <p>You are subscribed to push notifications.</p>
//                     <button onClick={unsubscribeFromPush}>Unsubscribe</button>
//                     <input
//                         type="text"
//                         placeholder="Enter notification message"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     />
//                     <button onClick={sendTestNotification}>Send Test</button>
//                 </>
//             ) : (
//                 <>
//                     <p>You are not subscribed to push notifications.</p>
//                     <button onClick={subscribeToPush}>Subscribe</button>
//                 </>
//             )}
//         </div>
//     );
// }

// function InstallPrompt() {
//     const [isIOS, setIsIOS] = useState(false);
//     const [isStandalone, setIsStandalone] = useState(false);

//     useEffect(() => {
//         setIsIOS(
//             /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window).MSStream
//         );

//         setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
//     }, []);

//     if (isStandalone) {
//         return null; // Don't show install button if already installed
//     }

//     return (
//         <div>
//             <h3>Install App</h3>
//             <button>Add to Home Screen</button>
//             {isIOS && (
//                 <p>
//                     To install this app on your iOS device, tap the share button
//                     <span role="img" aria-label="share icon">
//                         {' '}
//                         ⎋{' '}
//                     </span>
//                     and then "Add to Home Screen"
//                     <span role="img" aria-label="plus icon">
//                         {' '}
//                         {' '}
//                     </span>
//                     .
//                 </p>
//             )}
//         </div>
//     );
// }

const scoringDefault = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

export default function Home() {
    const [assessmentNumber, setAssessmentNumber] = useState(1);
    const [scoring, setScoring] = useState(scoringDefault);
    const [nihssTotalScore, setNihssTotalScore] = useState(0);
    const [assessmentFinished, setAssessmentFinished] = useState(false);

    useEffect(() => {

    }, []);

    const ScoreButton = ({ score, description, active }) => {
        const sellectScore = ({ target }) => {
            const btn = target;
            const score = Number(btn.id);

            const newScoring = [...scoring];   // ← kopi
            newScoring[assessmentNumber - 1] = score;

            setScoring(newScoring);
        }

        return (
            <div key={score} className={styles.assessmentScoringButtonContainer}>
                <button onClick={(e) => sellectScore(e)} id={score} className={active === true ? styles.assessmentScoringButtonActive : styles.assessmentScoringButton} >
                    <span>{score}:</span> {description}
                </button>
            </div>
        );
    }

    const previousAssessment = () => {
        if (assessmentNumber !== 1) {
            setAssessmentNumber(assessmentNumber - 1)
        }
    }

    const nextAssessment = () => {
        if (assessmentNumber !== 15) {
            setAssessmentNumber(assessmentNumber + 1)
        }
    }

    const finishAssessment = () => {
        setAssessmentFinished(true);
        calAssessmentSum();
    }

    const calAssessmentSum = () => {
        let sum = 0;

        scoring.forEach(score => {
            let s = score === null ? 0 : score;
            sum += s;
        });

        setNihssTotalScore(sum);
        console.log(sum);
        
    }

    return (
        <>
            {/* <PushNotificationManager />
            <InstallPrompt /> */}
            <main>
                {/* Assessment div */}
                <div style={{ display: assessmentFinished === false ? 'flex' : 'none' }} className={styles.mainContentFlex}>
                    <div className={styles.mainContentFlexTop}>
                        {/* Undersøgelse og suplerende til undersøgelse  */}
                        <div className={styles.assessmentHeaderContainer}>
                            <div className={styles.assessmentHeader}>
                                {NIHSS[assessmentNumber - 1].assessmentTitle}
                            </div>
                            <div className={styles.assessmentSubHeader}>
                                {NIHSS[assessmentNumber - 1].assessmentSubTitle}
                            </div>
                        </div>
                        {/* Beskrivelse af undersøgelse */}
                        <div className={styles.assessmentDescription}>
                            {NIHSS[assessmentNumber - 1].description}
                            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at sem lobortis, efficitur neque eget, fringilla ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent auctor consectetur massa, in faucibus turpis posuere eu. Curabitur ac feugiat nibh. Aenean mi ante, ultricies vitae aliquet sed, euismod eget erat. Suspendisse ac turpis nisi. */}
                        </div>
                    </div>
                    <div className={styles.mainContentFlexBottom}>
                        {/* Valg af point */}
                        <div className={styles.assessmentScoringContainer}>
                            {/* <div className={styles.assessmentScoringText}>
                                Angiv point:
                            </div> */}
                            <div className={styles.assessmentScoringButtonsContainer}>
                                {NIHSS[assessmentNumber - 1].assessmentScoring.map(b => (
                                    <ScoreButton key={b.score} score={b.score} description={b.description} active={scoring[assessmentNumber - 1] === b.score} />
                                ))}
                            </div>
                        </div>
                        {/* Næste undersøgelse knap */}
                        <div className={styles.nextAssessmentButtonContainer}>
                            <button onClick={previousAssessment} style={{ width: "20%" }} className={styles.previousAssessmentButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                            </button>
                            {assessmentNumber < 15 ? (
                                <button disabled={scoring[assessmentNumber - 1] === null ? true : false} onClick={nextAssessment} style={{ width: "80%" }} className={styles.nextAssessmentButton}>
                                    Næste
                                </button>
                            ) : (
                                <button onClick={finishAssessment} style={{ width: "80%" }} className={styles.nextAssessmentButton}>
                                    Afslut
                                </button>
                            )}
                        </div>
                        {/* Progressbar */}
                        <div style={{ width: `${assessmentNumber * 6.33}%` }} className={styles.progressbar}></div>
                    </div>
                </div>
                {/*  */}
                {/*  */}
                <div style={{ display: assessmentFinished === true ? 'flex' : 'none' }} className={styles.assessmentFinishedDisplay}>
                    <div className={styles.assessmentFinishedTotal}>
                        NIHSS score: <span>{nihssTotalScore}</span>
                    </div>
                    <div className={styles.assessmentFinishedTableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Undersøgelse
                                    </th>
                                    <th>
                                        Point
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        1a.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[0]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        1b.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[1]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        1c.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[2]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[3]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        3.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[4]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[5]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        5a.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[6]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        5b.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[7]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        6a.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[8]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        6b.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[9]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        7.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[10]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        8.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[11]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        9.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[13]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        10.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[13]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        11.
                                    </td>
                                    <td>
                                        {scoring[0] === null ? '--' : scoring[14]}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                        <button className={styles.nextAssessmentButton}>
                            Ny patient?
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}