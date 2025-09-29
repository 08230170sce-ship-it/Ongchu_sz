<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Love Box 💖</title>
    <!-- Load Tailwind CSS for beautiful utility styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Load Phosphor Icons for the Send Button -->
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <style>
        /* --- SOFT ROMANTIC PASTEL THEME STYLES --- */
        :root {
            --color-bg-primary: #fdf2f8; /* Very Light Pink/Blush */
            --color-accent-me: #f9739d; /* Romantic Rose Pink (Your messages) */
            --color-accent-her: #a7f3d0; /* Soft Mint Green (Her messages) */
            --color-text-dark: #292524; /* Stone/Dark Text for contrast */
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--color-bg-primary);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .chat-container {
            /* Responsive Width */
            width: 100%;
            max-width: 450px;
            height: 90vh;
            max-height: 700px;
            background-color: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(249, 115, 158, 0.2); /* Soft Pink Shadow */
            border: 1px solid #fbcfe8; /* Light Pink Border */
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        /* Header Styling */
        .chat-header {
            background-color: white;
            border-bottom: 1px solid #fbcfe8;
        }

        /* Message Area Scrolling */
        .chat-messages {
            flex-grow: 1;
            padding: 1rem;
            overflow-y: auto;
            scroll-behavior: smooth; /* Essential for smooth transitions! */
        }

        /* Custom Scrollbar Styling for Elegance */
        .chat-messages::-webkit-scrollbar {
            width: 8px;
        }
        .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }
        .chat-messages::-webkit-scrollbar-thumb {
            background-color: #fbcfe8; /* Light pink thumb */
            border-radius: 20px;
        }

        /* Individual Message Bubble Transitions */
        .message-bubble {
            padding: 10px 15px;
            margin-bottom: 10px;
            max-width: 85%;
            border-radius: 18px;
            line-height: 1.4;
            transition: all 0.3s ease-out; /* Smooth entrance and update */
            word-wrap: break-word;
            opacity: 0; /* Start hidden for entrance transition */
            transform: translateY(10px);
        }
        /* Fade in animation for new messages */
        .message-bubble.loaded {
            opacity: 1;
            transform: translateY(0);
        }

        /* Sent Message Styles (You - Romantic Rose Pink) */
        .message-sent {
            background-color: var(--color-accent-me);
            color: white;
            margin-left: auto;
            border-bottom-right-radius: 4px; /* Tail effect */
            animation: pulse-sent 1s ease-in-out infinite alternate;
        }

        /* Received Message Styles (Her - Soft Mint Green) */
        .message-received {
            background-color: var(--color-accent-her);
            color: var(--color-text-dark);
            margin-right: auto;
            border-bottom-left-radius: 4px; /* Tail effect */
        }

        /* Input area styling */
        .input-area {
            border-top: 1px solid #fecdd3; /* Soft border */
            padding: 15px;
            background-color: #fff;
        }

        /* Input field focus */
        .input-area input[type="text"] {
            border: 1px solid #fbcfe8;
            background-color: #fdf2f8; /* Light pink background */
        }
        .input-area input[type="text"]:focus {
            border-color: #f9739d;
            box-shadow: 0 0 0 3px rgba(249, 115, 158, 0.3);
        }


        /* Send button animation */
        .send-button {
            transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
        }
        .send-button:hover {
            background-color: #e54b73; /* Deeper pink */
            box-shadow: 0 4px 10px rgba(249, 115, 158, 0.4);
        }
        .send-button:active {
            transform: scale(0.95);
        }

        /* Responsive adjustments for the container */
        @media (max-width: 640px) {
            .chat-container {
                height: 100vh;
                max-height: none;
                border-radius: 0;
            }
        }

        /* Media content styling */
        .media-content {
            max-width: 100%;
            max-height: 300px;
            border-radius: 12px;
            margin-top: 8px;
            object-fit: contain; /* Ensures media fits nicely */
            transition: transform 0.3s ease-in-out;
            cursor: zoom-in;
        }
        .media-content:hover {
            transform: scale(1.03); /* Zoom effect on hover */
        }

        /* Pulsing animation for the user's latest message (optional romantic touch) */
        @keyframes pulse-sent {
            from { box-shadow: 0 0 0 0 rgba(249, 115, 158, 0.4); }
            to { box-shadow: 0 0 0 5px rgba(249, 115, 158, 0); }
        }

        /* Utility for hiding the loading spinner after auth */
        .hidden { display: none; }
    </style>
</head>
<body class="antialiased">

    <div id="auth-loading" class="text-xl text-gray-500 flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
        <i class="ph-heart text-pink-400 text-4xl animate-pulse mb-3"></i>
        <span>Starting our special connection...</span>
    </div>

    <div id="chat-app" class="chat-container hidden">
        <!-- Header Section -->
        <div class="chat-header text-gray-800 flex justify-between items-center px-6 py-4 rounded-t-xl">
            <h1 class="text-xl font-bold tracking-tight">
                Our Little Love Box <i class="ph-sparkling-fill text-yellow-500 ml-1"></i>
            </h1>
            <span id="user-id-display" class="text-xs text-pink-400 font-mono italic">
                ID: Loading...
            </span>
        </div>

        <!-- Messages Area -->
        <div id="messages-container" class="chat-messages">
            <!-- Messages will be injected here by JavaScript -->
        </div>

        <!-- Input Section -->
        <div class="input-area flex items-center">
            <input
                type="text"
                id="message-input"
                placeholder="Send a sweet message, or a link to an image/video..."
                class="flex-grow p-3 mr-3 rounded-full border focus:ring-2 transition duration-150 ease-in-out text-gray-700"
            />
            <button
                id="send-button"
                class="send-button w-12 h-12 bg-pink-400 text-white rounded-full flex items-center justify-center shadow-lg"
                onclick="sendMessage()"
            >
                <i class="ph-heart-fill text-2xl"></i>
            </button>
        </div>
    </div>

    <!-- Firebase Configuration and Script -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
        import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // setLogLevel('debug'); // Uncomment to debug Firebase issues

        let app;
        let db;
        let auth;
        let userId = 'loading'; // Will be set after authentication

        const messagesContainer = document.getElementById('messages-container');
        const messageInput = document.getElementById('message-input');
        const userIdDisplay = document.getElementById('user-id-display');
        const chatApp = document.getElementById('chat-app');
        const authLoading = document.getElementById('auth-loading');

        // --- GLOBAL VARIABLES (Provided by Canvas) ---
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        /**
         * 1. INITIALIZE FIREBASE AND AUTHENTICATION
         */
        async function initFirebase() {
            if (!firebaseConfig) {
                console.error("Firebase configuration is missing.");
                // Fallback to anonymous use case (no database persistence)
                authLoading.innerHTML = '<span class="text-red-500">Error: Database not available.</span>';
                return;
            }

            try {
                app = initializeApp(firebaseConfig);
                db = getFirestore(app);
                auth = getAuth(app);

                // Attempt to sign in using the custom token, or anonymously if not available
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }

                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        userId = user.uid;
                        userIdDisplay.textContent = `ID: ${userId.substring(0, 8)}...`;
                        authLoading.classList.add('hidden');
                        chatApp.classList.remove('hidden');
                        startMessageListener();
                    } else {
                        // This case should be handled by signInAnonymously if token fails
                        console.log("User signed out or failed anonymous sign-in.");
                    }
                });

            } catch (error) {
                console.error("Firebase initialization failed:", error);
                authLoading.innerHTML = `<span class="text-red-500">Auth Error: ${error.message}</span>`;
            }
        }

        /**
         * 2. MESSAGE SENDING LOGIC
         */
        window.sendMessage = async function() {
            const text = messageInput.value.trim();
            if (text === "" || !db || !userId) return;

            // Check if the message contains a media URL
            const mediaRegex = /(https?:\/\/\S+(?:jpg|jpeg|png|gif|mp4|webm|ogg|youtube\.com|youtu\.be)\S*)/gi;
            let mediaUrl = null;
            let messageText = text;

            const match = text.match(mediaRegex);
            if (match) {
                mediaUrl = match[0];
                // Remove the URL from the text part of the message
                messageText = text.replace(mediaRegex, '').trim();
            }

            try {
                // Public Collection Path for shared data between the two users
                const messagesRef = collection(db, `artifacts/${appId}/public/data/love_messages`);

                await addDoc(messagesRef, {
                    senderId: userId,
                    text: messageText,
                    mediaUrl: mediaUrl,
                    timestamp: serverTimestamp()
                });

                messageInput.value = ''; // Clear input field
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

        // Add Enter key listener for convenience
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('send-button').click();
            }
        });

        /**
         * 3. REAL-TIME MESSAGE LISTENER AND RENDERING
         */
        function startMessageListener() {
            if (!db || userId === 'loading') return;

            // Query: Get all messages, ordered by timestamp (newest last)
            const q = query(
                collection(db, `artifacts/${appId}/public/data/love_messages`),
                orderBy("timestamp", "asc")
            );

            // Set up real-time listener
            onSnapshot(q, (snapshot) => {
                let initialLoad = messagesContainer.children.length === 0;

                snapshot.docChanges().forEach((change) => {
                    const data = change.doc.data();
                    const messageId = change.doc.id;

                    if (change.type === "added") {
                        // Render new message
                        renderMessage(messageId, data);
                    }
                    // For a simple chat, we don't usually need to handle "modified" or "removed" unless messages can be edited/deleted.
                });

                // Scroll to the bottom smoothly after new messages are loaded
                if (!initialLoad) {
                     messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else {
                     // For initial load, scroll instantly
                     setTimeout(() => {
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                     }, 100);
                }
            });
        }

        /**
         * Renders a single message element into the DOM
         * @param {string} id - The document ID of the message.
         * @param {object} data - The message data.
         */
        function renderMessage(id, data) {
            const isMe = data.senderId === userId;
            const alignClass = isMe ? 'justify-end' : 'justify-start';
            const bubbleClass = isMe ? 'message-sent' : 'message-received';

            const wrapper = document.createElement('div');
            wrapper.className = `flex ${alignClass} message-wrapper`;
            wrapper.id = `msg-${id}`;

            let contentHTML = '';

            // 1. Handle Media Content (Images, Videos)
            if (data.mediaUrl) {
                const url = data.mediaUrl;
                let mediaElement;

                if (url.match(/\.(jpeg|jpg|png|gif)$/i)) {
                    // Image
                    mediaElement = `<img src="${url}" class="media-content" alt="Shared Image" onerror="this.onerror=null; this.src='https://placehold.co/200x150/fecdd3/881337?text=Image+Error';" loading="lazy">`;
                } else if (url.match(/\.(mp4|webm|ogg)$/i) || url.includes('youtube.com') || url.includes('youtu.be')) {
                    // Video (Direct link or YouTube/Vimeo embed)
                    let embedUrl = url;
                    if (url.includes('youtube.com') || url.includes('youtu.be')) {
                        // Simple check to convert YT share link to embed
                        const videoId = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2]?.split(/[^0-9a-z_\-]/i)[0];
                        if (videoId) {
                             embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`;
                        }
                    }

                    mediaElement = `
                        <iframe
                            src="${embedUrl}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            class="media-content w-full h-auto min-h-48"
                            title="Shared Video"
                        ></iframe>
                    `;
                }
                
                if (mediaElement) {
                     contentHTML += mediaElement;
                }
            }

            // 2. Handle Text Content
            const textContent = data.text ? data.text.replace(/\n/g, '<br>') : ''; // Handle newlines
            if (textContent || !data.mediaUrl) {
                // Only show text if it exists, or if it's a message without media (to ensure pure text is sent)
                contentHTML += `<p class="whitespace-pre-wrap">${textContent}</p>`;
            }


            const timestamp = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...';

            // Using pink/white for your messages, and mint/dark text for hers
            wrapper.innerHTML = `
                <div class="message-bubble ${bubbleClass} shadow-md">
                    ${contentHTML}
                    <span class="block text-xs mt-2 ${isMe ? 'text-pink-100' : 'text-gray-600'} text-right italic">${timestamp}</span>
                </div>
            `;

            messagesContainer.appendChild(wrapper);

            // Add the 'loaded' class after appending to trigger the fade-in transition
            setTimeout(() => {
                wrapper.querySelector('.message-bubble').classList.add('loaded');
            }, 50); // Small delay to ensure CSS registers the element before transition

        }

        // Initialize the application on page load
        initFirebase();
    </script>
</body>
</html>
