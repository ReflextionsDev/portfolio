import { writable } from "svelte/store";

// Vars
// export const url = "http://localhost:8080";
export const url = "https://nlb.dev";
export const iconSize = writable(64)
export const theme = {
    bgColors: {
        primary: "#1a1a1a",
        secondary: "#361f83",
        gradientSilver: "linear-gradient(120deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%)",
    },
    skewAngle: -3,
    bgImages: {
        space: "url(\"/assets/backgrounds/nasa.jpg\")"
    },
    bgMasks: {
        green: 'rgba(0, 128, 0, 0.329)',
        blue: '#1c2f858a'
    }
}

// Games
export const gameTags = ["all", "featured", "freelance", "web", "mobile", "jam", "sale"]

// Game Descriptions
// import AdderDesc from './components/game/descriptions/AdderDesc.svelte'
import ProtoshiftDesc from './components/game/descriptions/ProtoshiftDesc.svelte'
import SoulGrinderDesc from './components/game/descriptions/SoulGrinderDesc.svelte'
import RTRDesc from './components/game/descriptions/RTRDesc.svelte'
import DontFallDesc from './components/game/descriptions/DontFallDesc.svelte'
import GridlockDashDesc from './components/game/descriptions/GridlockDashDesc.svelte'
import JetAttackDesc from './components/game/descriptions/JetAttackDesc.svelte'
import MinosPondDesc from './components/game/descriptions/MinosPondDesc.svelte'
import SamDesc from './components/game/descriptions/SamDesc.svelte'
import RocketStrikeDesc from './components/game/descriptions/RocketStrikeDesc.svelte'
import RoadwayDesc from './components/game/descriptions/RoadwayDesc.svelte'
import BalloonsDesc from './components/game/descriptions/BalloonsDesc.svelte'
import BrixDesc from './components/game/descriptions/BrixDesc.svelte'
import RocketRunnerDesc from './components/game/descriptions/RocketRunnerDesc.svelte'
import VoterDesc from './components/game/descriptions/VoterDesc.svelte'
import MTACountryDesc from './components/game/descriptions/MTACountryDesc.svelte'
import FantakneeDesc from './components/game/descriptions/FantakneeDesc.svelte'
import MayhemDesc from './components/game/descriptions/MayhemDesc.svelte'
import TowerDefenseDesc from './components/game/descriptions/TowerDefenseDesc.svelte'
import KCPSDesc from "./components/game/descriptions/KCPSDesc.svelte";
import ChemDesc from "./components/game/descriptions/ChemDesc.svelte";

// Sizes - small, tall, big, huge (unused), wide (unused)
export const games = [
    // Soul Grinder
    {
        date: "Feb 23, 2022",
        title: "Soul Grinder",
        platform: "laptop",
        size: "big",
        desc: SoulGrinderDesc,
        hasDesktopPreview: true,
        hasMobilePreview: true,
        src: "https://itch.io/embed-upload/6242510?color=1C0C42",
        cover: "/assets/games/soulgrinder/cover.png",
        gif: "/assets/games/soulgrinder/soulgrinder.gif",
        tags: ["featured", "mobile", "web", "jam", "sale"],
        links: [
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/soul-grinder",
            },
            {
                label: "Crazy Games",
                link: "https://www.crazygames.com/game/soul-grinder",
            },
            {
                label: "Scirra Arcade",
                link: "https://www.construct.net/en/free-online-games/soul-grinder-36000/play",
            },
        ],
        images: [
            {
                src: "/assets/games/soulgrinder/1.png",
                alt: "soulgrinder screenshot",
            },
            {
                src: "/assets/games/soulgrinder/3.png",
                alt: "soulgrinder screenshot",
            },
            {
                src: "/assets/games/soulgrinder/5.png",
                alt: "soulgrinder screenshot",
            },
            {
                src: "/assets/games/soulgrinder/4.png",
                alt: "soulgrinder screenshot",
            },
            {
                src: "/assets/games/soulgrinder/6.png",
                alt: "soulgrinder screenshot",
            },
            {
                src: "/assets/games/soulgrinder/7.png",
                alt: "soulgrinder screenshot",
            },
        ],

    },
    // KCPS
    {
        date: "2019",
        title: "Kitty Cat Poker Slots",
        size: "big",
        platform: "laptop",
        desc: KCPSDesc,
        hasDesktopPreview: false,
        hasMobilePreview: false,
        src: "https://play.google.com/store/apps/details?id=com.Go2No1.KittyCat",
        cover: "/assets/games/kcps/kcpsCover.png",
        gif: "/assets/games/kcps/kcps.gif",
        tags: ["featured", "mobile", "freelance"],
        videos: [
            {
                label: "Trailer",
                src: "https://www.youtube.com/embed/_na6hF010b0",
            }
        ],
        links: [
            {
                label: "Google Play",
                link: "https://play.google.com/store/apps/details?id=com.Go2No1.KittyCat"
            }
        ],
        images: [
            {
                src: "/assets/games/kcps/kcps1.png",
                alt: "Kitty Cat Poker Slots menu screen",
            },
            {
                src: "/assets/games/kcps/kcps2.png",
                alt: "Kitty Cat Poker Slots screenshot (1)",
            },
            {
                src: "/assets/games/kcps/kcps3.png",
                alt: "Kitty Cat Poker Slots screenshot (2)",
            },
            {
                src: "/assets/games/kcps/kcps4.png",
                alt: "Kitty Cat Poker Slots screenshot (3)",
            },
            {
                src: "/assets/games/kcps/kcps5.png",
                alt: "Kitty Cat Poker Slots screenshot (4)",
            },
            {
                src: "/assets/games/kcps/kcps6.png",
                alt: "Kitty Cat Poker Slots screenshot (5)",
            },
        ],
    },
    // Roadway Repair
    {
        date: "2016",
        title: "Roadway Repair",
        platform: "phone",
        size: "tall",
        desc: RoadwayDesc,
        hasDesktopPreview: true,
        hasMobilePreview: true,
        src: "https://itch.io/embed-upload/6246806?color=333333",
        cover: "/assets/games/roadwayrepair/roadwayCover.png",
        gif: "/assets/games/roadwayrepair/roadway.gif",
        icon: "/assets/games/roadwayrepair/RoadwayRepairIcon.png",
        tags: ["featured", "mobile", "web", "sale"],
        links: [
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/roadway-repair",
            },
        ],
        images: [
            {
                src: "/assets/games/roadwayrepair/rrmenu.png",
                alt: "roadway repair menu screen",
            },
            {
                src: "/assets/games/roadwayrepair/roadway1.png",
                alt: "roadway repair menu, levels, and tutorial screen",
            },
            {
                src: "/assets/games/roadwayrepair/roadway2.png",
                alt: "roadway level screens",
            },
        ],
    },
    // Protoshift
    {
        date: "Jan 15, 2016",
        title: "Protoshift",
        platform: "laptop",
        size: "big",
        desc: ProtoshiftDesc,
        hasDesktopPreview: true,
        hasMobilePreview: false,
        src: "https://itch.io/embed-upload/6238921?color=000000",
        cover: "/assets/games/protoshift/protoshiftCover.png",
        gif: "/assets/games/protoshift/protoshift.gif",
        tags: ["featured", "web", "sale"],
        links: [
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/protoshift",
            },
            {
                label: "Scirra Arcade",
                link: "https://www.construct.net/en/free-online-games/protoshift-41700/play",
            },
        ],
        images: [
            {
                src: "/assets/games/protoshift/card1BG.png",
                alt: "protoshift screenshot",
            },
            {
                src: "/assets/games/protoshift/card2BG.png",
                alt: "protoshift screenshot",
            },
            {
                src: "/assets/games/protoshift/card3BG.jpg",
                alt: "protoshift screenshot",
            },
            {
                src: "/assets/games/protoshift/card4BG.jpg",
                alt: "protoshift screenshot",
            },
            {
                src: "/assets/games/protoshift/card6BG.jpg",
                alt: "protoshift screenshot",
            },
        ],
        videos: [
            {
                label: "Trailer",
                src: "https://www.youtube.com/embed/noXmLOkoHoo",

            },
            {
                label: "Soundtrack",
                src: "https://www.youtube.com/embed/sgIUKdjbfOs",
            },
        ],
    },
    // Don't Fall
    {
        date: "2013",
        title: "Don't Fall!",
        platform: "laptop",
        size: "small",
        desc: DontFallDesc,
        hasDesktopPreview: true,
        hasMobilePreview: false,
        src: "https://itch.io/embed-upload/6243387?color=333333",
        cover: "/assets/games/dontfall/dfCover.png",
        gif: "/assets/games/dontfall/df.gif",
        tags: ["featured", "web", "sale"],
        links: [
            {
                label: "Scirra Arcade",
                link: "https://www.construct.net/en/free-online-games/dont-fall-94/play",
            },
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/dont-fall",
            },
        ],
        images: [
            {
                src: "/assets/games/dontfall/df1.png",
                alt: "Don't Fall! screenshot",
            },
            {
                src: "/assets/games/dontfall/df2.png",
                alt: "Don't Fall! screenshot",
            },
            {
                src: "/assets/games/dontfall/df3.png",
                alt: "Don't Fall! screenshot",
            },
        ],
    },
    // Bouncy Balloons
    {
        date: "2016",
        title: "Bouncy Balloons",
        platform: "phone",
        size: "tall",
        desc: BalloonsDesc,
        hasDesktopPreview: true,
        hasMobilePreview: true,
        src: "https://itch.io/embed-upload/6248445?color=333333",
        cover: "assets/games/bouncyballoons/bouncyballoonsportrait.png",
        gif: "assets/games/bouncyballoons/balloons.gif",
        icon: "assets/games/bouncyballoons/BalloonIcon.png",
        tags: ["featured", "mobile", "web", "sale"],
        links: [
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/bouncy-balloons",
            },
        ],
        images: [
            {
                src: "/assets/games/bouncyballoons/bouncyballoons1.png",
                alt: "bouncy balloons menu screen",
            },
            {
                src: "/assets/games/bouncyballoons/bouncyballoons2.png",
                alt: "bouncy ballons screenshot (1)",
            },
            {
                src: "/assets/games/bouncyballoons/bouncyballoons3.png",
                alt: "bouncy ballons screenshot (2)",
            },
        ],
    },
    // RTR
    {
        date: "2013",
        title: "Red Tie Runner",
        platform: "laptop",
        size: "big",
        desc: RTRDesc,
        hasDesktopPreview: true,
        hasMobilePreview: false,
        src: "https://itch.io/embed-upload/6243042?color=5c7272",
        cover: "/assets/games/rtr/rtrCover.png",
        gif: "/assets/games/rtr/rtr.gif",
        tags: ["featured", "mobile", "web", "sale"],
        links: [
            {
                label: "Scirra Arcade",
                link: "https://www.construct.net/en/free-online-games/red-tie-runner-1463/play",
            },
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/red-tie-runner",
            },
            {
                label: "Y8",
                link: "https://www.y8.com/games/red_tie_runner"
            }
        ],
        images: [
            {
                src: "/assets/games/rtr/ss1.png",
                alt: "Red Tie Runner menu screen",
            },
            {
                src: "/assets/games/rtr/ss2.png",
                alt: "Red Tie Runner screenshot (1)",
            },
            {
                src: "/assets/games/rtr/ss3.png",
                alt: "Red Tie Runner screenshot (2)",
            },
            {
                src: "/assets/games/rtr/ss4.png",
                alt: "Red Tie Runner screenshot (4)",
            },
            {
                src: "/assets/games/rtr/ss5.png",
                alt: "Red Tie Runner screenshot (5)",
            },
            {
                src: "/assets/games/rtr/ss6.png",
                alt: "Red Tie Runner screenshot (6)",
            },
            {
                src: "/assets/games/rtr/ss7.png",
                alt: "Red Tie Runner screenshot (7)",
            },
        ],
        videos: [
            {
                label: "Trailer",
                src: "https://www.youtube.com/embed/AlBAiyg96eY",
            },
        ],
    },
    //  Jet Attack
    {
        date: "2013",
        title: "Jet Attack!",
        platform: "laptop",
        size: "small",
        desc: JetAttackDesc,
        hasDesktopPreview: true,
        hasMobilePreview: false,
        src: "https://itch.io/embed-upload/6243474?color=333333",
        cover: "/assets/games/jetattack/jaCover3.png",
        gif: "/assets/games/jetattack/ja.gif",
        tags: ["web", "sale"],
        links: [
            {
                label: "Scirra Arcade",
                link: "https://www.construct.net/en/free-online-games/jet-attack-1477/play",
            },
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/jet-attack",
            },
            {
                label: "Y8",
                link: "https://www.y8.com/games/jet_attack"
            },
            {
                label: "Chrome Web Store",
                link: "https://chrome.google.com/webstore/detail/jet-attack/ajkmfllnckceklaikmcmppnlhekmafob?",
            },
        ],
        images: [
            {
                src: "/assets/games/jetattack/ss1.png",
                alt: "Jet Attack! screenshot",
            },
            {
                src: "/assets/games/jetattack/ss2.png",
                alt: "Jet Attack! screenshot",
            },
            {
                src: "/assets/games/jetattack/ss3.png",
                alt: "Jet Attack! screenshot",
            },
            {
                src: "/assets/games/jetattack/ss4.png",
                alt: "Jet Attack! screenshot",
            },
        ],
    },
    // Gridlock Dash
    {
        date: "2014",
        title: "Gridlock Dash",
        platform: "laptop",
        size: "small",
        desc: GridlockDashDesc,
        hasDesktopPreview: true,
        hasMobilePreview: false,
        src: "https://itch.io/embed-upload/1796902?color=333333",
        cover: "/assets/games/gridlock/gdCover.png",
        gif: "/assets/games/gridlock/gridlock.gif",
        tags: ["web", "mobile", "sale"],
        links: [
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/gridlock-dash",
            },
            {
                label: "Chrome Web Store",
                link: "https://chrome.google.com/webstore/detail/gridlock-dash/npanhggcndhhgnpefpeiihmihnecijbd?"
            }
        ],
        images: [
            {
                src: "/assets/games/gridlock/ss5.png",
                alt: "gridlock screenshot",
            },
            {
                src: "/assets/games/gridlock/ss1.png",
                alt: "gridlock screenshot",
            },
            {
                src: "/assets/games/gridlock/ss2.png",
                alt: "gridlock screenshot",
            },
            {
                src: "/assets/games/gridlock/ss4.png",
                alt: "gridlock screenshot",
            },
            {
                src: "/assets/games/gridlock/ss3.png",
                alt: "gridlock screenshot",
            },
        ],
    },
    // Sam
    {
        date: "Dec 15, 2016",
        title: "Sam",
        platform: "laptop",
        size: "small",
        desc: SamDesc,
        hasDesktopPreview: true,
        hasMobilePreview: false,
        src: "https://itch.io/embed-upload/347253?color=000000",
        cover: "/assets/games/sam/samCover.png",
        gif: "/assets/games/sam/sam.gif",
        tags: ["featured", "web", "jam"],
        links: [
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/sam",
            },
            {
                label: "Scirra Arcade",
                link: "https://www.construct.net/en/free-online-games/sam-1499/play"
            }
        ],
        images: [
            {
                src: "/assets/games/sam/1.png",
                alt: "Sam screenshot",
            },
            {
                src: "/assets/games/sam/2.png",
                alt: "Sam screenshot",
            },
            {
                src: "/assets/games/sam/3.png",
                alt: "Sam screenshot",
            },
            {
                src: "/assets/games/sam/4.png",
                alt: "Sam screenshot",
            },
        ],
    },
    // Minos' Pond
    {
        date: "April 24th, 2017",
        title: "Mino's Pond",
        platform: "laptop",
        size: "small",
        desc: MinosPondDesc,
        hasDesktopPreview: true,
        hasMobilePreview: false,
        src: "https://itch.io/embed-upload/464651?color=0f5c9a",
        cover: "/assets/games/minos/minosCover.png",
        gif: "/assets/games/minos/minos.gif",
        tags: ["web", "jam"],
        links: [
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/minospond",
            },
            {
                label: "Scirra Arcade",
                link: "https://www.construct.net/en/free-online-games/minos-pond-1795/play?via=pp"
            },
            {
                label: "Ludum Dare",
                link: "https://ldjam.com/events/ludum-dare/38/minos-pond/"
            }
        ],
        images: [
            {
                src: "/assets/games/minos/SS1.png",
                alt: "minos screenshot",
            },
            {
                src: "/assets/games/minos/SS3.png",
                alt: "minos screenshot",
            },
            {
                src: "/assets/games/minos/SS4.png",
                alt: "minos screenshot",
            },
            {
                src: "/assets/games/minos/SS2.png",
                alt: "minos screenshot",
            },
            {
                src: "/assets/games/minos/SS5.gif",
                alt: "minos screenshot",
            },
        ],

    },
    // Brix Builder
    {
        date: "2016",
        title: "Brix Builder",
        platform: "phone",
        size: "tall",
        desc: BrixDesc,
        hasDesktopPreview: true,
        hasMobilePreview: true,
        src: "https://itch.io/embed-upload/6248551?color=333333",
        cover: "/assets/games/brixbuilder/brixCover.png",
        gif: "/assets/games/brixbuilder/brix.gif",
        icon: "/assets/games/brixbuilder/Icon.png",
        tags: ["mobile", "web", "sale"],
        links: [
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/brix-builder",
            },
        ],
        images: [
            {
                src: "/assets/games/brixbuilder/brixbuilder1.png",
                alt: "Brix Builder menu screen",
            },
            {
                src: "/assets/games/brixbuilder/brixbuilder2.png",
                alt: "Brix Builder screenshot (1)",
            },
            {
                src: "/assets/games/brixbuilder/brixbuilder3.png",
                alt: "Brix Builder screenshot (2)",
            },
        ],

    },
    // Rocket Runner
    {
        date: "2016",
        title: "Rocket Runner",
        platform: "phone",
        size: "tall",
        desc: RocketRunnerDesc,
        hasDesktopPreview: true,
        hasMobilePreview: true,
        src: "https://itch.io/embed-upload/6248631?color=333333",
        cover: "/assets/games/rocketrunner/rocketCover.png",
        gif: "/assets/games/rocketrunner/rocket.gif",
        icon: "/assets/games/rocketrunner/Icon.png",
        tags: ["mobile", "web", "sale"],
        links: [
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/rocket-runner",
            },
        ],
        images: [
            {
                src: "/assets/games/rocketrunner/rocketrunner1.png",
                alt: "Rocket Runner menu screen",
            },
            {
                src: "/assets/games/rocketrunner/rocketrunner2.png",
                alt: "Rocket Runner screenshot (1)",
            },
            {
                src: "/assets/games/rocketrunner/rocketrunner3.png",
                alt: "Rocket Runner screenshot (2)",
            },
        ],

    },
    // Voter Suppression
    {
        date: "Nov 3, 2016",
        title: "The Voter Suppression Trail",
        platform: "laptop",
        size: "big",
        desc: VoterDesc,
        hasDesktopPreview: false,
        hasMobilePreview: true,
        src: "https://www.nytimes.com/interactive/2016/11/01/opinion/voting-suppression-videogame.html",
        cover: "/assets/games/voter/voterCover.png",
        gif: "/assets/games/voter/voter.gif",
        tags: ["featured", "mobile", "web", "freelance"],
        links: [
            {
                label: "NY Times",
                link: "https://www.nytimes.com/interactive/2016/11/01/opinion/voting-suppression-videogame.html",
            },
            {
                label: "Everyday Arcade",
                link: "https://everydayarcade.com/games/the-voter-suppression-trail"
            }
        ],
        images: [
            {
                src: "/assets/games/voter/voter1.png",
                alt: "Voter Suppression Trail menu screen",
            },
            {
                src: "/assets/games/voter/voter2.png",
                alt: "Voter Suppression Trail screenshot (1)",
            },
            {
                src: "/assets/games/voter/voter3.png",
                alt: "Voter Suppression Trail screenshot (2)",
            },
            {
                src: "/assets/games/voter/voter4.png",
                alt: "Voter Suppression Trail screenshot (4)",
            },
            {
                src: "/assets/games/voter/voter5.png",
                alt: "Voter Suppression Trail screenshot (5)",
            },
        ],
    },
    // MTA Country
    {
        date: "May 22, 2018",
        title: "MTA Country",
        platform: "laptop",
        size: "small",
        desc: MTACountryDesc,
        hasDesktopPreview: false,
        hasMobilePreview: true,
        src: "https://everydayarcade.com/games/mta-country",
        cover: "/assets/games/mta/MTACover.png",
        gif: "/assets/games/mta/MTA.gif",
        tags: ["featured", "mobile", "web", "freelance"],
        links: [
            {
                label: "Everyday Arcade",
                link: "https://everydayarcade.com/games/mta-country"
            }
        ],
        images: [
            {
                src: "/assets/games/mta/MTA.png",
                alt: "MTA Country menu screen",
            },
            {
                src: "/assets/games/mta/MTA2.png",
                alt: "MTA Country screenshot (1)",
            },
            {
                src: "/assets/games/mta/MTA3.png",
                alt: "MTA Country screenshot (2)",
            },
            {
                src: "/assets/games/mta/MTA4.png",
                alt: "MTA Country screenshot (3)",
            },
        ],
    },
    // Rocket Strike
    {
        date: "2014",
        title: "Rocket Strike!",
        platform: "laptop",
        size: "small",
        desc: RocketStrikeDesc,
        hasDesktopPreview: true,
        hasMobilePreview: false,
        src: "https://itch.io/embed-upload/1796897?color=333333",
        cover: "/assets/games/rocketstrike/rocketstrikeCover.png",
        gif: "/assets/games/rocketstrike/rocketstrike.gif",
        tags: ["web", "mobile", "featured", "sale"],
        links: [
            {
                label: "Scirra Arcade",
                link: "https://www.construct.net/en/free-online-games/rocket-strike-3791/play",
            },
            {
                label: "Itch.io",
                link: "https://reflextions.itch.io/rocketstrike",
            },
            {
                label: "Y8",
                link: "https://www.y8.com/games/rocket_strike",
            },
            {
                label: "Chrome Web Store",
                link: "https://chrome.google.com/webstore/detail/rocket-strike/ldfmjnlghddcjpboloecgkflfednighd?"
            }
        ],
        images: [
            {
                src: "/assets/games/rocketstrike/ss1.png",
                alt: "Rocket Strike! screenshot",
            },
            {
                src: "/assets/games/rocketstrike/ss3.png",
                alt: "Rocket Strike! screenshot",
            },
            {
                src: "/assets/games/rocketstrike/ss4.png",
                alt: "Rocket Strike! screenshot",
            },
            {
                src: "/assets/games/rocketstrike/ss5.png",
                alt: "Rocket Strike! screenshot",
            },
        ],
    },
    // Fantaknee Football
    {
        date: "2017",
        title: "Fantaknee Football",
        size: "small",
        platform: "laptop",
        desc: FantakneeDesc,
        hasDesktopPreview: false,
        hasMobilePreview: true,
        src: "https://ilovechrisbaker.com/stuff/Fantaknee-Football/index.html",
        cover: "/assets/games/fantaknee/fantakneeCover.png",
        gif: "/assets/games/fantaknee/fantaknee.gif",
        tags: ["mobile", "web", "freelance"],
        links: [
            {
                label: "Game",
                link: "https://ilovechrisbaker.com/fantaknee-football-by-super-deluxe/"
            }
        ],
        images: [
            {
                src: "/assets/games/fantaknee/fantaknee1.png",
                alt: "Fantaknee Football menu screen",
            },
            {
                src: "/assets/games/fantaknee/fantaknee2.png",
                alt: "Fantaknee Football screenshot (1)",
            },
            {
                src: "/assets/games/fantaknee/fantaknee3.png",
                alt: "Fantaknee Football screenshot (2)",
            },
            {
                src: "/assets/games/fantaknee/fantaknee4.png",
                alt: "Fantaknee Football screenshot (3)",
            },
        ],
    },

    // Tower Defense
    {
        date: "Aug 2019",
        title: "Tower Defense Prototype",
        size: "small",
        platform: "laptop",
        desc: TowerDefenseDesc,
        hasDesktopPreview: false,
        hasMobilePreview: false,
        cover: "/assets/games/tower/towerCover.png",
        gif: "/assets/games/tower/tower.gif",
        tags: ["freelance"],
        images: [
            {
                src: "/assets/games/tower/tower1.png",
                alt: "Tower Defense prototype menu screen",
            },
            {
                src: "/assets/games/tower/tower2.png",
                alt: "Tower Defense prototype screenshot (1)",
            },
            {
                src: "/assets/games/tower/tower3.png",
                alt: "Tower Defense prototype screenshot (2)",
            },
        ],
    },
    // Chem Game
    {
        date: "June 2017",
        title: "Chemistry Hotspot Quiz",
        size: "small",
        platform: "laptop",
        desc: ChemDesc,
        hasDesktopPreview: false,
        hasMobilePreview: false,
        cover: "/assets/games/chem/chemCover.png",
        gif: "/assets/games/chem/chem.gif",
        tags: ["freelance"],
        images: [
            {
                src: "/assets/games/chem/chem1.png",
                alt: "Chemistry Hotspot Quiz menu screen",
            },
            {
                src: "/assets/games/chem/chem2.png",
                alt: "Chemistry Hotspot Quiz screenshot (1)",
            },
            {
                src: "/assets/games/chem/chem3.png",
                alt: "Chemistry Hotspot Quiz screenshot (2)",
            },
            {
                src: "/assets/games/chem/chem4.png",
                alt: "Chemistry Hotspot Quiz screenshot (3)",
            },
        ],
    },
    // Nomzilla
    {
        date: "Dec 2016",
        title: "Monster's Mayhem",
        size: "small",
        platform: "laptop",
        desc: MayhemDesc,
        hasDesktopPreview: false,
        hasMobilePreview: false,
        cover: "/assets/games/nom/nomCover.png",
        gif: "/assets/games/nom/nom.gif",
        tags: ["freelance"],
        images: [
            {
                src: "/assets/games/nom/nom1.png",
                alt: "Monster's Mayhem menu screen",
            },
            {
                src: "/assets/games/nom/nom2.png",
                alt: "Monster's Mayhem screenshot (1)",
            },
            {
                src: "/assets/games/nom/nom3.png",
                alt: "Monster's Mayhem screenshot (2)",
            },
            {
                src: "/assets/games/nom/nom4.png",
                alt: "Monster's Mayhem screenshot (3)",
            },
        ],
    },
]

// Adder
// {
//     date: "TBD",
//     title: "Adder",
//     platform: "laptop",
//     size: "big",
//     desc: AdderDesc,
//     hasDesktopPreview: false,
//     hasMobilePreview: false,
//     src: "",
//     cover: "/assets/games/adder/cover.png",
//     gif: "/assets/games/adder/adder.gif",
//     tags: ["featured"],
//     images: [
//         {
//             src: "/assets/games/adder/1.png",
//             alt: "adder screenshot",
//         },
//         {
//             src: "/assets/games/adder/2.png",
//             alt: "adder screenshot",
//         },
//         {
//             src: "/assets/games/adder/3.png",
//             alt: "adder screenshot",
//         },
//         {
//             src: "/assets/games/adder/4.png",
//             alt: "adder screenshot",
//         }
//     ],
// },

// Web Projects
import Portfolio from "./components/web/descriptions/Portfolio.svelte"
import RTT from "./components/web/descriptions/RTT.svelte"
import Snippets from "./components/web/descriptions/Snippets.svelte"

export const projects = [
    {
        title: "Construct Snippets (WIP)",
        desc: "Work in Progress",
        fullDesc: Snippets,
        stack: ["React", "Mantine", "Express", "MongoDB", "EC2"],
        techs: [
            {
                label: "React",
                link: "https://reactjs.org/"
            },
            {
                label: "Mantine",
                link: "https://mantine.dev/"
            },
            {
                label: "Express",
                link: "https://expressjs.com/"
            },
            {
                label: "MongoDB",
                link: "https://www.mongodb.com/"
            },
            {
                label: "AWS EC2",
                link: "https://aws.amazon.com/ec2/"
            },
        ],
        link: "https://constructsnippets.com/",
        links: [
            {
                label: "Website",
                link: "https://constructsnippets.com/"
            },
            {
                label: "Frontend Repo",
                link: "https://github.com/ReflextionsDev/construct-snippets-frontend"
            },
            {
                label: "Backend Repo",
                link: "https://github.com/ReflextionsDev/construct-snippets-backend"
            },
        ],
        deps: [
            {
                label: "Axios",
                link: "https://axios-http.com/docs/intro"
            },
            {
                label: "Tabler Icons",
                link: "https://tabler-icons-react.vercel.app/"
            },
            {
                label: "React Router",
                link: "https://v5.reactrouter.com/web/guides/quick-start"
            },
            {
                label: "bcryptjs",
                link: "https://www.npmjs.com/package/bcryptjs"
            },
            {
                label: "jsonwebtoken",
                link: "https://www.npmjs.com/package/jsonwebtoken"
            },
            {
                label: "validator",
                link: "https://www.npmjs.com/package/validator"
            },
        ],
        preview: {
            desktop: "/assets/projects/snippets/snippets.png",
            mobile: "/assets/projects/snippets/snippetsM.png",
        },
    },
    {
        title: "Portfolio",
        youAreHere: true,
        desc: "After going through various websites over the years, I wanted a single location to put all my content. This site was built with Svelte and served as a personal capstone project in front-end development.",
        fullDesc: Portfolio,
        stack: ["Svelte", "Page.js"],
        techs: [
            {
                label: "Svelte",
                link: "https://svelte.dev/"
            },
            {
                label: "Page.js",
                link: "https://www.npmjs.com/package/page"
            }
        ],
        link: "https://nlb.dev",
        links: [
            {
                label: "Website",
                link: "https://nlb.dev"
            },
            {
                label: "Github Repo",
                link: "https://github.com/ReflextionsDev/Portfolio"
            }
        ],
        deps: [
            {
                label: "Svelte Simple Modal",
                link: "https://www.npmjs.com/package/svelte-simple-modal"
            },
            {
                label: "Svelte Media Query",
                link: "https://www.npmjs.com/package/svelte-media-query"
            },
            {
                label: "Svelte Lightbox",
                link: "https://www.npmjs.com/package/svelte-lightbox"
            },
            {
                label: "Svelte Viewport Info",
                link: "https://www.npmjs.com/package/svelte-viewport-info"
            }
        ],
        preview: {
            desktop: "/assets/projects/portfolio/desktop3.png",
            mobile: "/assets/projects/portfolio/mobile4.png",
        },
    },
    {
        title: "React Ticket Tracker (WIP)",
        desc: "React Ticket Tracker is a fullstack bug tracker built with React and state management via Redux. Supports filtering, user roles, permissions, and organization assignment. Backend is built with Node & Express.",
        fullDesc: RTT,
        stack: ["React", "Redux", "Express", "MongoDB", "EC2"],
        techs: [
            {
                label: "React",
                link: "https://reactjs.org/"
            },

            {
                label: "Express",
                link: "https://expressjs.com/"
            },
            {
                label: "MongoDB",
                link: "https://www.mongodb.com/"
            },
            {
                label: "AWS EC2",
                link: "https://aws.amazon.com/ec2/"
            },
        ],
        link: "https://react-ticket-frontend.vercel.app/",
        links: [
            {
                label: "Website",
                link: "https://react-ticket-frontend.vercel.app/"
            },
            {
                label: "Frontend Repo",
                link: "https://github.com/ReflextionsDev/react-ticket-frontend"
            },
            {
                label: "Backend Repo",
                link: "https://github.com/ReflextionsDev/react-ticket-backend"
            },
        ],
        deps: [
            {
                label: "Redux",
                link: "https://react-redux.js.org/"
            },
            {
                label: "React Router",
                link: "https://v5.reactrouter.com/web/guides/quick-start"
            },
            {
                label: "React Select",
                link: "https://react-select.com/home"
            },
            {
                label: "bcryptjs",
                link: "https://www.npmjs.com/package/bcryptjs"
            },
            {
                label: "jsonwebtoken",
                link: "https://www.npmjs.com/package/jsonwebtoken"
            },
            {
                label: "validator",
                link: "https://www.npmjs.com/package/validator"
            },
        ],
        preview: {
            desktop: "/assets/projects/rtt/rtt.png",
            mobile: "/assets/projects/rtt/rtt.png",
        },
    },

]

// Other Web projects
export const projectsOther = [
    {
        title: "Post Comment Backend",
        desc: "A full CRUD backend written in JS using Node, Express, and Mongoose.",
        img: "/assets/projects/other/postcomment.png",
        link: "https://github.com/ReflextionsDev/post-comment-backend",
    },
    {
        title: "Jeopardy",
        desc: "An interactive Jeopardy board built with jQuery.",
        img: "/assets/projects/other/jeopardy.png",
        link: "https://github.com/ReflextionsDev/jeopardy"
    },
    {
        title: "Map Builder",
        desc: "Create a fantasy style map with jQeury drag and drop.",
        img: "/assets/projects/other/mapbuilder.png",
        link: "https://github.com/ReflextionsDev/Map-Builder"
    },
    {
        title: "Hacker News API",
        desc: "Loads and displays the top 100 stories from the Hacker News API w/ jQuery.",
        img: "/assets/projects/other/hackernews.png",
        link: "https://github.com/ReflextionsDev/hackernews-api"
    },
    {
        title: "SoundCloud Mockup",
        desc: "A static mockup of the SoundCloud home page using HTML and CSS.",
        img: "/assets/projects/other/soundcloud.png",
        link: "https://github.com/ReflextionsDev/soundcloud-mockup"
    }
];