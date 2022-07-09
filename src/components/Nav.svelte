<!-- would like to rename things to nav -->
<script>
    export let header = false;

    // const elem = document.querySelector(".tabs__bar");

    // let value1 = 0;

    // document.addEventListener("scroll", function () {
    //     value1 = -3 + window.scrollY / 45;
    //     // elem.style.transform = "skewY(" + value1 + "deg)"
    // });

    // console.log("value1", value1);

    const skewBase = -5
    let skewAngle = skewBase + 'deg';


    window.onscroll = function () {
        //
        const elem = document.querySelector(".splash__content");

        let distScrolled = Math.abs(elem.getBoundingClientRect().top);

        let elemHeight = elem.offsetHeight;

        // Percentage of the element that has been scrolled, capped at 100
        let progress = Math.min(
            Math.round((distScrolled / elemHeight) * 100),
            100
        );

        // Inverse of progress

        let skewMultiplier = ((100 - progress) / 100);
        skewAngle = skewBase*skewMultiplier + 'deg'

        // console.log(progress)

        console.log("Skew", skewAngle)

        // yeet = progress + '%';
        // console.log("progress", yeet);
    };
</script>

<div class="tabs" class:header>
    <div class="tabs__bar" class:header style="--skewAngle: {skewAngle};">
        <div class="tab tab__web">
            <div>WEB</div>
        </div>

        <div class="tab tab__games">
            <div>GAMES</div>
        </div>
    </div>
    <div class="tabs__fill" class:header style="--skewAngle: {skewAngle};" />
</div>

<!-- Side shadows on hover, current tab could be higher too -->
<style>
    .tabs__fill {
        content: "";
        width: 100%;
        height: 600%;
        position: absolute;
        background-color: rgb(26 26 26);
        /* z-index: 1; */
        top: 48px;
        left: 0;
        transform-origin: bottom left;
        /* transform: skewY(-3deg); */
        transform: skewY(var(--skewAngle));
        /* Smooths angled edges */
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        overflow: hidden;
        /* transition: all 0.4s ease-in-out; */
    }

    .tabs__fill.header {
        display: none;
    }

    .tabs {
        /* z-index: 1; */
        /* padding: 24px 0px; */
        height: 48px;
        /* margin-top: 6vw; */
        position: relative;
    }

    .tabs.header {
        margin-top: 0;
    }

    .tabs__bar {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 41%);
        /* z-index: 1; */
        top: 0;
        left: 0;
        transform-origin: bottom left;
        /* transform: skewY(-3deg); */
        transform: skewY(var(--skewAngle));
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        /* overflow: hidden; */

        /* opacity: var(--skewAngle); */

        /* transition: all 0.4s ease-in-out; */
    }

    .tabs__bar.header {
        transform: none;
    }

    .tab {
        display: flex;
        align-self: center;
        justify-content: center;
        align-items: center;
        align-self: center;
        font-size: larger;
        font-weight: bold;
        bottom: 0;
        transition: all 0.1s ease-out;
    }

    .tab:hover {
        /* background-color: wheat; */
        height: 120%;
    }

    .tab__web {
        z-index: 1;
        background-color: rgb(98, 29, 247);
        position: absolute;
        width: 10%;
        height: 100%;
        left: 80%;
    }

    .tab__games {
        z-index: 1;
        background-color: rgb(53, 129, 186);
        position: absolute;
        width: 10%;
        height: 100%;
        left: 90%;
    }
</style>
