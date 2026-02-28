'use client'

import styles from "./page.module.css";
import NIHSS from "./nihss.json";
import { useState, useEffect, use } from 'react'
import { useRouter } from "next/navigation";
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
    const [showImage, setShowImage] = useState(false);
    const [choosenImage, setChoosenImage] = useState(null);
    const [showConfirmNewAssessment, setShowConfirmNewAssessment] = useState(false);

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

    const openImage = (imageFileName) => {
        setChoosenImage(`./${imageFileName}`);
        setShowImage(true);
    }

    const closeImage = () => {
        setShowImage(false);
        setChoosenImage(null);
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

    const newAssessment = () => {
        setAssessmentNumber(1);
        setScoring(scoringDefault);
        setNihssTotalScore(0);
        setAssessmentFinished(false);
        setShowConfirmNewAssessment(false);
    }

    return (
        <>
            {/* <PushNotificationManager />
            <InstallPrompt /> */}
            {showImage === true ? (
                <div className={styles.AssessmentImageContainer}>
                    {choosenImage === './9-room.jpg' ? (
                        <div className={styles.AssessmentImageKitchen}>
                            <img src={`/${choosenImage}`} />
                        </div>
                    ) : (
                        <div className={styles.AssessmentImage}>
                            <img src={`/${choosenImage}`} />
                        </div>
                    )}
                    <div className={styles.AssessmentImageCloseDiv}>
                        <button onClick={closeImage}>
                            Luk billede
                        </button>
                    </div>
                </div>
            ) : (
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
                                <div className={styles.assessmentDescriptionHeader}>
                                    <u>{NIHSS[assessmentNumber - 1].descriptionHeader}</u>
                                </div>
                                {NIHSS[assessmentNumber - 1].description}
                                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at sem lobortis, efficitur neque eget, fringilla ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent auctor consectetur massa, in faucibus turpis posuere eu. Curabitur ac feugiat nibh. Aenean mi ante, ultricies vitae aliquet sed, euismod eget erat. Suspendisse ac turpis nisi. */}
                            </div>
                        </div>
                        {assessmentNumber === 13 ? (
                            <div className={styles.imagesContainer}>
                                <div className={styles.imagesContainerTitle}>
                                    Billeder: <span>(Klik for at se billede. Taler patienten dansk, bruges engelsk ikke)</span>
                                </div>
                                <div className={styles.imagesButtonsContainer}>
                                    <button onClick={() => openImage("9-room.jpg")}>
                                        Værelse
                                    </button>
                                    <button onClick={() => openImage("9-objects-new.jpg")}>
                                        Genstande
                                    </button>
                                    <button onClick={() => openImage("9-sentences-danish.png")}>
                                        Sætninger
                                    </button>
                                    <button onClick={() => openImage("9-sentences.png")}>
                                        Sætninger (engelsk)
                                    </button>
                                    {/* <button onClick={() => openImage("9-words.png")}>
                                        Ord
                                    </button> */}
                                </div>
                            </div>
                        ) : null}
                        {assessmentNumber === 14 ? (
                            <div className={styles.imagesContainer}>
                                <div className={styles.imagesContainerTitle}>
                                    Billeder: <span>(Klik for at se billede. Taler patienten dansk, bruges engelsk ikke)</span>
                                </div>
                                <div className={styles.imagesButtonsContainer}>
                                    <button onClick={() => openImage("9-words-danish.png")}>
                                        Ord
                                    </button>
                                    <button onClick={() => openImage("9-words.png")}>
                                        Ord (engelsk)
                                    </button>
                                </div>
                            </div>
                        ) : null}
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
                                    // disabled={scoring[assessmentNumber - 1] === null ? true : false}
                                    <button onClick={nextAssessment} style={{ width: "80%" }} className={styles.nextAssessmentButton}>
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
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    1a. Bevisthedsnivaue
                                </div>
                                <div>
                                    {scoring[0] === null ? '--' : scoring[0]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    1b. Spørgsmål
                                </div>
                                <div>
                                    {scoring[1] === null ? '--' : scoring[1]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    1c. Kommandoer
                                </div>
                                <div>
                                    {scoring[2] === null ? '--' : scoring[2]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    2. Blik
                                </div>
                                <div>
                                    {scoring[3] === null ? '--' : scoring[3]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    3. Test af synsfelt
                                </div>
                                <div>
                                    {scoring[4] === null ? '--' : scoring[4]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    4. Facialisparese
                                </div>
                                <div>
                                    {scoring[5] === null ? '--' : scoring[5]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    5a. Motorisk funktion - ve. arm
                                </div>
                                <div>
                                    {scoring[6] === null ? '--' : scoring[6]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    5b. Motorisk funktion - hø. arm
                                </div>
                                <div>
                                    {scoring[7] === null ? '--' : scoring[7]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    6a. Motorisk funktion - ve. ben
                                </div>
                                <div>
                                    {scoring[8] === null ? '--' : scoring[8]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    6b. Motorisk funktion - hø. ben
                                </div>
                                <div>
                                    {scoring[9] === null ? '--' : scoring[9]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    7. Ekstremitets ataksi
                                </div>
                                <div>
                                    {scoring[10] === null ? '--' : scoring[10]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    8. Sensibilitet
                                </div>
                                <div>
                                    {scoring[11] === null ? '--' : scoring[11]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    9. Afasi
                                </div>
                                <div>
                                    {scoring[12] === null ? '--' : scoring[12]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    10. Dysartri
                                </div>
                                <div>
                                    {scoring[13] === null ? '--' : scoring[13]}
                                </div>
                            </div>
                            <div className={styles.assessmentFinishedContainer}>
                                <div>
                                    11. Inattention
                                </div>
                                <div>
                                    {scoring[14] === null ? '--' : scoring[14]}
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingBottom: '0px' }}>
                            {showConfirmNewAssessment === false ? (
                                <button style={{ fontSize: "18px" }} onClick={() => setShowConfirmNewAssessment(true)} className={styles.nextAssessmentButton}>
                                    Ny patient?
                                </button>
                            ) : (
                                <div className={styles.confirmNewAssessmentContainer}>
                                    <button style={{ fontSize: "18px", backgroundColor: '#9c0606' }} onClick={newAssessment} className={styles.confirmNewAssessmentButton}>
                                        Ja
                                    </button>
                                    <button style={{ fontSize: "18px" }} onClick={() => setShowConfirmNewAssessment(false)} className={styles.confirmNewAssessmentButton}>
                                        Nej
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}