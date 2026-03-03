'use client'

import styles from "./page.module.css";
import NIHSS from "./nihss.json";
import { useState, useEffect, use } from 'react'
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, CardHeader, Checkbox, CircularProgress, cn, Divider } from "@heroui/react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconCheck, IconNumber0, IconNumber1, IconNumber2, IconNumber3, IconNumber4, IconNumber5 } from "@tabler/icons-react";
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

    const AssessmentOptionCheckbox = ({ score, isSelected, icon, text }) => {
        const sellectScore = (selectedState) => {
            const newScoring = [...scoring]; // ← kopi

            if (selectedState === true) {
                newScoring[assessmentNumber - 1] = score;
                setScoring(newScoring);
            }
        }

        return (
            <div className="w-full">
                <Checkbox
                    isSelected={isSelected}
                    onValueChange={(e) => sellectScore(e)}
                    className="w-full"
                    classNames={{
                        base: cn(
                            "!w-full",
                            "w-full",
                            "max-w-none",
                            "block",
                            "flex",
                            "bg-content1",
                            "hover:bg-content2",
                            "cursor-pointer rounded-lg gap-2 py-3 border-2 border-content3",
                            "data-[selected=true]:border-primary",
                        ),
                        label: "!w-full w-full block max-w-none",
                        icon: "hidden",
                        wrapper: "hidden"
                    }}
                    style={{ margin: "0.5px", width: "100%", display: "block" }}
                >
                    <div className={cn(styles.assessmentOptionContentContainer, "w-full")}>
                        <div style={{ color: "#006FEE" }}>
                            {icon === 0 ? <IconNumber0 /> : null}
                            {icon === 1 ? <IconNumber1 /> : null}
                            {icon === 2 ? <IconNumber2 /> : null}
                            {icon === 3 ? <IconNumber3 /> : null}
                            {icon === 4 ? <IconNumber4 /> : null}
                            {icon === 5 ? <IconNumber5 /> : null}
                        </div>
                        <div className="w-full">
                            {text}
                        </div>
                    </div>
                </Checkbox>
            </div>
        );
    };

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

    return (
        <>
            <div className={styles.body}>
                <main className={styles.main}>
                    <div>
                        <Card>
                            <CardHeader>
                                <div className={styles.header}>
                                    <div className={styles.title}>
                                        {/* <span>1a.</span> Bevisthedsnivaue */}
                                        {NIHSS[assessmentNumber - 1].assessmentTitle}
                                    </div>
                                    {NIHSS[assessmentNumber - 1].assessmentSubTitle.length > 1 &&
                                    assessmentNumber !== 7 &&
                                    assessmentNumber !== 8 &&
                                    assessmentNumber !== 9 &&
                                    assessmentNumber !== 10 ? (
                                        <div className={styles.subtitle}>
                                            {NIHSS[assessmentNumber - 1].assessmentSubTitle}
                                        </div>
                                    ) : null}
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <div className={styles.descriptionContainer}>
                                    {assessmentNumber === 7 ||
                                    assessmentNumber === 8 ||
                                    assessmentNumber === 9 ||
                                    assessmentNumber === 10 ? (
                                        <div className={styles.descriptionTitle}>{NIHSS[assessmentNumber - 1].assessmentSubTitle}</div>
                                    ) : null}
                                    {NIHSS[assessmentNumber - 1].description}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </main>
                <div>
                    <div className={styles.assessmentOptionsContainer}>
                        {NIHSS[assessmentNumber - 1].assessmentScoring.map(b => (
                            <AssessmentOptionCheckbox
                                key={b.score}
                                score={b.score}
                                isSelected={scoring[assessmentNumber - 1] === b.score}
                                icon={b.score}
                                text={b.description}
                            />
                        ))}
                    </div>
                    <footer className={styles.footer}>
                        <div>
                            <Card>
                                <CardBody>
                                    <div className={styles.footerBody}>
                                        <div>
                                            <Button onClick={previousAssessment} isDisabled={assessmentNumber === 1} variant="bordered" color="primary" size="lg"><IconArrowNarrowLeft /></Button>
                                        </div>
                                        <div>
                                            <CircularProgress
                                                aria-label="Loading..."
                                                color="primary"
                                                showValueLabel={false}
                                                size="md"
                                                value={(assessmentNumber / 15) * 100}
                                            />
                                        </div>
                                        <div>
                                            {assessmentNumber === 15 ?
                                                <Button onClick={nextAssessment} color="success" size="lg"><IconCheck /></Button>
                                            : 
                                                <Button onClick={nextAssessment} color="primary" size="lg"><IconArrowNarrowRight /></Button>
                                            }
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}