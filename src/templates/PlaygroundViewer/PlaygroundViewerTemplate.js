/* eslint-disable no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import FullscreenSVG from "./FullscreenSVG";
import AddAvatar from "./AddAvatar";
import AvatarList from "./AvatarList";
import SwitchPlayground from "./SwitchPlayground";
import PlaygroundList from "./PlaygroundList";
import ControlsWidget from "./ControlsWidget";
import AnimationSVG from "./AnimationSVG";
import AnimationList from "./AnimationList";
import InfoSVG from "./InfoSVG";
import PlaygroundSVG from "./InfoSVG copy";
import Link from "next/link";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { getAvatarsByOwner } from "@/actions/client/avatars";
import { getNftsByOwnerAndCollection } from "@/actions/client/playgrounds";
import Spinner from "@/components/Spinner";
import AvatarShopSvg from "./AvatarShopSvg";



const PlaygroundViewerTemplate = ({
	playground,
	vrm,
	isTest,
	collectionId,
	paramPlaygroundId,
	avatarId
}) => {
	const [unityInstance, setUnityInstance] = useState()
	const [playgroundId, setPlaygroundId] = useState(null)
	const [activePanel, setActivePanel] = useState('info');

	const handlePanelClick = (panelName, event) => {
		event.stopPropagation()
		setActivePanel((currentPanel) => (currentPanel === panelName ? null : panelName));
	};

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const closePanels = () => setActivePanel(null);

	const [ownedAvatars, setOwnedAvatars] = useState([])
	const [ownedPlaygrounds, setOwnedPlaygrounds] = useState([])

	const handleAvatarChange = (url) => {
		unityInstance.SendMessage(
			"JavaScriptReceiver",
			"LoadAvatarFromURL",
			url
		);
	}

	useEffect(() => {
		if (paramPlaygroundId) {
			setPlaygroundId(paramPlaygroundId)
		}
	}, [paramPlaygroundId])


	const handlePlaygroundChange = (url, id) => {
		unityInstance.SendMessage('JavaScriptReceiver', 'LoadModelFromURL', url)
		setPlaygroundId(id)
	}

	const handleAnimationChange = (emote) => {
		unityInstance.SendMessage('JavaScriptReceiver', 'TriggerEmote', emote)
	}

	const { address } = useWeb3ModalAccount();


	useEffect(() => {
		if (!address) return
		const getOwnedAvatars = async () => {
			const data = await getAvatarsByOwner(address)

			setOwnedAvatars(data)
		}
		const getOwnedPlaygrounds = async () => {
			const data = await getNftsByOwnerAndCollection(address, isTest)

			setOwnedPlaygrounds(data)
		}

		getOwnedAvatars()
		getOwnedPlaygrounds()
	}, [address, isTest])



	useEffect(() => {
		window.ReceiveUnityResponse = function (response) {
			let parsedResponse = JSON.parse(response);
			// console.log("Received response from Unity:", parsedResponse);
			// alert("Unity responded: " + parsedResponse.message);
		};
		// Load Unity Instance Script
		const script = document.createElement("script");
		script.src = "/unityWGL/Build/Build.loader.js";
		script.onload = () => {
			const canvas = document.querySelector("#unity-canvas");
			const progressBarFull = document.querySelector(
				"#unity-progress-bar-full"
			);
			const loadingBar = document.querySelector("#unity-loading-bar");

			const config = {
				dataUrl: "/unityWGL/Build/Build.data",
				frameworkUrl: "/unityWGL/Build/Build.framework.js",
				codeUrl: "/unityWGL/Build/Build.wasm",
				streamingAssetsUrl: "StreamingAssets",
				companyName: "DefaultCompany",
				productName: "PlaygroundViewer",
				productVersion: "0.1",
				showBanner: (msg, type) => {
					console.log(`${type}: ${msg}`);
				},
			};

			// Check if the createUnityInstance function is defined
			if (typeof createUnityInstance === "function") {
				createUnityInstance(canvas, config, (progress) => {
					progressBarFull.style.width = 100 * progress + "%";
				})
					.then((instance) => {
						setUnityInstance(instance)
						loadingBar.style.display = "none";

						window.navigation.addEventListener("navigate", (event) => {
							instance.Quit();
						})

						if (vrm) {
							instance.SendMessage(
								"JavaScriptReceiver",
								"LoadAvatarFromURL",
								vrm
							);
						}

						if (playground) {
							instance.SendMessage('JavaScriptReceiver', 'LoadModelFromURL', playground)
						}
					})
					.catch((message) => {
						throw new Error((message))
					});
			} else {
				throw new Error("createUnityInstance function not found.");
			}
		};
		script.onerror = () => {
			throw new Error("Failed to load Unity loader script.");
		};
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, []);


	if (!isClient) {
		// Prevent rendering until client-side rendering is ready
		return (
			<div className="flex justify-center h-screen items-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="relative w-screen h-screen select-none" onClick={closePanels}>
			<div
				id="unity-container"
				className="absolute left-0 top-0 w-screen h-screen"
			></div>
			<canvas
				id="unity-canvas"
				width="960"
				height="600"
				className="bg-transparent w-full h-full z-20"
			></canvas>
			<div id="unity-loading-bar" className="absolute left-1/2 top-1/2 hidden">
				<div
					id="unity-logo"
					className="w-[154px] h-[130px] bg-center bg-no-repeat"
					style={{ backgroundImage: "url('/unity-logo-dark.png')" }}
				></div>
				<div
					id="unity-progress-bar-empty"
					className="w-[141px] h-[18px] mt-2 ml-[6.5px] bg-center bg-no-repeat"
					style={{ backgroundImage: "url('/progress-bar-empty-dark.png')" }}
				>
					<div
						id="unity-progress-bar-full"
						className="w-0 h-[18px] mt-2 bg-center bg-no-repeat"
						style={{ backgroundImage: "url('/progress-bar-full-dark.png')" }}
					></div>
				</div>
			</div>
			<div
				id="unity-warning"
				className="absolute left-1/2 top-[5%] transform -translate-x-1/2 bg-white p-2 hidden"
			></div>
			<div className="bg-blur-dark-50 border border-blur-dark-12 backdrop-blur p-5 flex justify-between gap-5 absolute bottom-[2%] left-[2%] z-20 rounded-2xl">
				<button
					onClick={() => unityInstance.SetFullscreen(1)}
					className="p-2 bg-grey-lightest rounded-md hover:cursor-pointer hover:bg-grey-normal"
				>
					<FullscreenSVG />
				</button>
				<button
					className="p-2 bg-grey-lightest rounded-md hover:cursor-pointer hover:bg-grey-normal"
					onClick={(event) => handlePanelClick('animation', event)}
				>
					<AnimationSVG />
				</button>
				<button
					className="p-2 bg-grey-lightest rounded-md hover:cursor-pointer hover:bg-grey-normal"
					onClick={(event) => handlePanelClick('info', event)}
				>
					<InfoSVG />
				</button>
			</div>
			{/* <div className="flex flex-col bg-blur-dark-50 border border-blur-dark-12 backdrop-blur px-4 py-5 justify-between gap-5 absolute top-[13%] right-[2%] rounded-2xl w-[80px] items-center">

				<button
					disabled={!address}
					className={`p-2  w-[40px] h-[40px] rounded-md ${address
						? "bg-black-lighter-1  hover:cursor-pointer hover:bg-grey-normal"
						: "bg-white-10 cursor-not-allowed"}`}
					onClick={(event) => handlePanelClick('avatar', event)}
				>
					<AddAvatar />
				</button>
				<button
					disabled={!address}
					className={`p-2  w-[40px] h-[40px] rounded-md flex justify-center items-center ${address
						? "bg-black-lighter-1  hover:cursor-pointer hover:bg-grey-normal"
						: "bg-white-10 cursor-not-allowed"}`}
					onClick={(event) => handlePanelClick('playground', event)}
				>
					<SwitchPlayground />
				</button>
				<div className="bg-grey-normal h-[1px] w-[40px]"></div>
				<p className="font-body text-sm font-semibold text-grey-lightest w-[48px] text-center">View In Store</p>
				<Link
					href={avatarId ? `/asset/${avatarId}` : "#"}
					onClick={() => {
						if (avatarId) {
							unityInstance.Quit();
						}
					}}
					className={`${!avatarId ? 'cursor-not-allowed bg-white-10 pointer-events-none' : 'hover:cursor-pointer hover:bg-grey-normal bg-black-lighter-1'
						} p-2 rounded-md w-[40px] h-[40px] flex justify-center items-center`}
					aria-disabled={!avatarId}  // Ensures screen readers recognize the disabled state
				>
					<AvatarShopSvg />
				</Link>
				<Link
					href={playgroundId ? `/asset/${playgroundId}` :
						collectionId ? `/collection/${collectionId}` : '#'}
					onClick={() => {
						if (playgroundId || collectionId) {
							unityInstance.Quit();
						}
					}}
					className={`${!playgroundId && !collectionId ? 'cursor-not-allowed bg-white-10 pointer-events-none' : 'hover:cursor-pointer hover:bg-grey-normal bg-black-lighter-1'
						} p-2 rounded-md w-[40px] h-[40px] flex justify-center items-center`}
					aria-disabled={!playgroundId && !collectionId}  // Ensures screen readers recognize the disabled state
				>
					<PlaygroundSVG />
				</Link>

			</div> */}
			{activePanel === 'avatar' && <div className="absolute top-[13%] right-[7%]">
				<AvatarList handleAvatarChange={handleAvatarChange} avatars={ownedAvatars} />
			</div>}
			{activePanel === 'playground' && <div className="absolute top-[14%] right-[9%]">
				<PlaygroundList handlePlaygroundChange={handlePlaygroundChange} playgrounds={ownedPlaygrounds} />
			</div>}
			{activePanel === 'animation' && <div className="absolute top-[49%] left-[7%]">
				<AnimationList handleAnimationChange={handleAnimationChange} />
			</div>}
			{activePanel === 'info' && <div className="absolute top-[13%] left-[2%]">
				<ControlsWidget handleClose={(event) => handlePanelClick('info', event)} />
			</div>}
		</div>
	);
};

export default PlaygroundViewerTemplate;
