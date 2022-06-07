<script>
    import { Javascript, Html5, CssThree, React, Redux, Svelte, NodeDotJs, Git, Amazonaws, Mongodb, Express, Notion,ConstructThree } from "./../icons/icons.js";
    const iconSize = 45;
</script>

<div>
    <!-- Icons for JS, HTMLL5, CSS, React, Redux, Svelte, Node, Git, aws, construct, notion, mongo, express -->
    <div class="info">
        <h1>Nathan Bennett</h1>
        <h2>Web & Game Development</h2>
        <h3>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
            quaerat officiis dicta ipsam quae ea porro maiores praesentium neque
            delectus sint aliquid, quis et atque vitae, cum obcaecati. Nisi, et?
        </h3>

        <Javascript color={"#F7DF1E"} size={iconSize} />
        <Html5 color={"#E34F26"} size={iconSize} />
        <CssThree color={"#1572B6"} size={iconSize} />
        <React color={"#61DAFB"} size={iconSize} />
        <Redux color={"#764ABC"} size={iconSize} />
        <Svelte color={"#FF3E00"} size={iconSize} />
        <NodeDotJs color={"#339933"} size={iconSize} />
        <Git color={"#F05032"} size={iconSize} />
        <Amazonaws color={"#232F3E"} size={iconSize} />
        <Mongodb color={"#47A248"} size={iconSize} />
        <Express color={"#000000"} size={iconSize} />
        <Notion color={"#000000"} size={iconSize} />
        <ConstructThree color={"#00FFDA"} size={iconSize} />
    </div>

    <div class="y">
        <img src="assets/games/adder/cover.png" alt="" />
    </div>

    <div class="x">
        <img src="assets/games/adder/cover.png" alt="" />
    </div>
    <div class="y">
        <img src="assets/games/adder/cover.png" alt="" />
    </div>
</div>

<style>
    .stackIcon {
        width: 500px;
    }

    .info {
        padding: 50px 50px 500px 50px;

        background-image: linear-gradient(
            175deg,
            #22313f00 80%,
            #94e0e0 calc(80% + 2px)
        );
    }

    div img {
        width: 70%;
        height: auto;
    }

    .y {
        padding: 50px 50px 200px 50px;
        /* background-color: #94E0E0; */
        background-image: linear-gradient(
            175deg,
            #94e0e0 80%,
            #ffffff00 calc(80% + 2px)
        );
    }

    .y img {
        margin-left: 250px;
    }
</style>
