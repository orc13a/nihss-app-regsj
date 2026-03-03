'use client'

import styles from "./page.module.css";
import NIHSS from "./nihss.json";
import { useState, useEffect, use } from 'react'
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, CardHeader, Checkbox, CircularProgress, cn, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconCamera, IconCheck, IconNumber0, IconNumber1, IconNumber2, IconNumber3, IconNumber4, IconNumber5 } from "@tabler/icons-react";
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
//                     <button onPress={unsubscribeFromPush}>Unsubscribe</button>
//                     <input
//                         type="text"
//                         placeholder="Enter notification message"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     />
//                     <button onPress={sendTestNotification}>Send Test</button>
//                 </>
//             ) : (
//                 <>
//                     <p>You are not subscribed to push notifications.</p>
//                     <button onPress={subscribeToPush}>Subscribe</button>
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
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    const openImage = (imageFileName) => {
        setChoosenImage(`./${imageFileName}`);
        setShowImage(true);
    }

    const closeImage = () => {
        setShowImage(false);
        setChoosenImage(null);
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
            <Modal backdrop='blur' size="xs" placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{showConfirmNewAssessment ? "Ny patient?" : "Vælg billede"}</ModalHeader>
                            <ModalBody>
                                {assessmentNumber === 13 ? (
                                    <>
                                        <Button color="primary" variant="bordered" size="lg" onPress={() => { onClose(), openImage("9-room.jpg") }}>
                                            Værelse
                                        </Button>
                                        <Button color="primary" variant="bordered" size="lg" onPress={() => { onClose(), openImage("9-objects-new.jpg") }}>
                                            Genstande
                                        </Button>
                                        <Button color="primary" variant="bordered" size="lg" onPress={() => { onClose(), openImage("9-sentences-danish.png") }}>
                                            Sætninger 🇩🇰
                                        </Button>
                                        <Button color="primary" variant="bordered" size="lg" onPress={() => { onClose(), openImage("9-sentences.png") }}>
                                            Sætninger 🇬🇧
                                        </Button>
                                    </>
                                ) : null}
                                {/*  */}
                                {assessmentNumber === 14 ? (
                                    <>
                                        <Button color="primary" variant="bordered" size="lg" onPress={() => { onClose(), openImage("9-words-danish.png") }}>
                                            Ord 🇩🇰
                                        </Button>
                                        <Button color="primary" variant="bordered" size="lg" onPress={() => { onClose(), openImage("9-words.png") }}>
                                            Ord 🇬🇧
                                        </Button>
                                    </>
                                ) : null}
                                {showConfirmNewAssessment ? (
                                    <>

                                    </>
                                ) : null}
                            </ModalBody>
                            <ModalFooter>
                                {showConfirmNewAssessment ? (
                                    <>
                                        <Button color="primary" variant="flat" onPress={onClose}>
                                            Annullér 
                                        </Button>
                                        <Button color="danger" variant="bordered" onPress={() => { newAssessment(), onClose() }}>
                                            Ny patient
                                        </Button>
                                    </>
                                ) : (
                                    <Button color="default" variant="light" onPress={onClose}>
                                        Tilbage
                                    </Button>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {showImage ? (
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
                        <Button size='lg' variant="bordered" color="primary" onPress={onOpen}>
                            Vælg nyt billede
                        </Button>
                        <Button size='lg' variant="bordered" color="danger" onPress={closeImage}>
                            Luk billede
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={styles.body}>
                    {assessmentFinished === false ? (
                        <>
                            <main className={styles.main}>
                                <div>
                                    <Card radius="lg">
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
                                            {assessmentNumber === 13 ? (
                                                <div className={styles.imageButtonContainer}>
                                                    <Button
                                                        size="lg"
                                                        color="primary"
                                                        variant="ghost"
                                                        startContent={<IconCamera />}
                                                        onPress={onOpen}
                                                    >
                                                        Billeder
                                                    </Button>
                                                </div>
                                            ) : null}
                                            {assessmentNumber === 14 ? (
                                                <div className={styles.imageButtonContainer}>
                                                    <Button
                                                        size="lg"
                                                        color="primary"
                                                        variant="ghost"
                                                        startContent={<IconCamera />}
                                                        onPress={onOpen}
                                                    >
                                                        Billeder
                                                    </Button>
                                                </div>
                                            ) : null}
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
                                        <Card radius="lg">
                                            <CardBody>
                                                <div className={styles.footerBody}>
                                                    <div>
                                                        <Button onPress={previousAssessment} isDisabled={assessmentNumber === 1} variant="faded" color="primary" size="lg"><IconArrowNarrowLeft /></Button>
                                                    </div>
                                                    <div>
                                                        <CircularProgress
                                                            aria-label="Loading..."
                                                            color="primary"
                                                            showValueLabel={false}
                                                            size="md"
                                                            value={(assessmentNumber / 16) * 100}
                                                        />
                                                    </div>
                                                    <div>
                                                        {assessmentNumber === 15 ?
                                                            <Button onPress={finishAssessment} color="success" size="lg"><IconCheck /></Button>
                                                            :
                                                            <Button onPress={nextAssessment} color="primary" size="lg"><IconArrowNarrowRight /></Button>
                                                        }
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </footer>
                            </div>
                        </>
                    ) : (
                        <>
                            <main className={styles.main}>
                                <div>
                                    <Card radius="lg">
                                        <CardHeader>
                                            <div className={styles.assessmentFinishedTitle}>
                                                <div>
                                                    NIHSS score:
                                                </div>
                                                {nihssTotalScore < 5 ? (
                                                    <div style={{ color: '#17C964' }}>
                                                        {nihssTotalScore}
                                                    </div>
                                                ) : null}
                                                {nihssTotalScore > 4 && nihssTotalScore < 16 ? (
                                                    <div style={{ color: '#F5A524' }}>
                                                        {nihssTotalScore}
                                                    </div>
                                                ) : null}
                                                {nihssTotalScore > 15 ? (
                                                    <div style={{ color: '#F31260' }}>
                                                        {nihssTotalScore}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody>
                                            <div className={styles.finishAssessmentBoxContainer}>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            1a. Bevisthedsnivaue
                                                        </div>
                                                        <div>
                                                            {scoring[0] === null ? '--' : scoring[0]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            1b. Spørgsmål
                                                        </div>
                                                        <div>
                                                            {scoring[1] === null ? '--' : scoring[1]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            1c. Kommandoer
                                                        </div>
                                                        <div>
                                                            {scoring[2] === null ? '--' : scoring[2]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            2. Blik
                                                        </div>
                                                        <div>
                                                            {scoring[3] === null ? '--' : scoring[3]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            3. Test af synsfelt
                                                        </div>
                                                        <div>
                                                            {scoring[4] === null ? '--' : scoring[4]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            4. Facialisparese
                                                        </div>
                                                        <div>
                                                            {scoring[5] === null ? '--' : scoring[5]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            5a. Motorisk funktion - ve. arm
                                                        </div>
                                                        <div>
                                                            {scoring[6] === null ? '--' : scoring[6]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            5b. Motorisk funktion - hø. arm
                                                        </div>
                                                        <div>
                                                            {scoring[7] === null ? '--' : scoring[7]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            6a. Motorisk funktion - ve. ben
                                                        </div>
                                                        <div>
                                                            {scoring[8] === null ? '--' : scoring[8]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            6b. Motorisk funktion - hø. ben
                                                        </div>
                                                        <div>
                                                            {scoring[9] === null ? '--' : scoring[9]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            7. Ekstremitets ataksi
                                                        </div>
                                                        <div>
                                                            {scoring[10] === null ? '--' : scoring[10]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            8. Sensibilitet
                                                        </div>
                                                        <div>
                                                            {scoring[11] === null ? '--' : scoring[11]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            9. Afasi
                                                        </div>
                                                        <div>
                                                            {scoring[12] === null ? '--' : scoring[12]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            10. Dysartri
                                                        </div>
                                                        <div>
                                                            {scoring[13] === null ? '--' : scoring[13]}
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button variant="faded" className={styles.finishAssessmentBox} size="sm">
                                                    <div>
                                                        <div>
                                                            11. Inattention
                                                        </div>
                                                        <div>
                                                            {scoring[14] === null ? '--' : scoring[14]}
                                                        </div>
                                                    </div>
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <div className={styles.newPatientBtn}>
                                        <Button onPress={() => { setShowConfirmNewAssessment(true), onOpen() }} size='lg' color="primary" variant="flat">
                                            Ny patient?
                                        </Button>
                                    </div>
                                </div>
                            </main>
                        </>
                    )}
                </div>
            )}
        </>
    );
}