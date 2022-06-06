<div class="navbar content">
    <div class="title"><h1>Nathan Bennett</h1></div>

    <div class="spacer" />
    
    <!-- why sub div links? -->
    <div class="links">
        <a href="/">
            <div class="link">Home</div>
        </a>
        <a href="/web">
            <div class="link">Web</div>
        </a>
        <a href="/games">
            <div class="link">Games</div>
        </a>
    </div>
</div>

<style>
    .navbar {
        height: 100%;
        display: flex;
        align-items: center;
        position: sticky;
    }

    .title {
        flex: 0.75;
    }

    .spacer {
        flex: 1.5;
    }

    .links {
        flex: 1;
        display: flex;
        justify-content: space-evenly;
    }

    .link {
        font-size: 2em;
        color: black;
    }

    a {
        text-decoration: none;
    }


</style>