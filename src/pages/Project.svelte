<!-- Should be modular, accept images, title text, tech stack, order, etc -->

<script>
    import Laptop from "./../components/Laptop.svelte";
    import Phone from "./../components/Phone.svelte";
</script>

<div class="projects">
    <div class="project">
        <div class="spotlight">

            <div style="display: flex; justify-content: center">
                <Laptop />
            </div>

            <div style="display: flex; justify-content: center; gap: 20px ">
       
                <h4>React</h4>
                <h4>Redux</h4>
                <h4>Node</h4>
                <h4>Express</h4>
            </div>

            
        </div>
        <div class="info">
            <h1>React Ticket Tracker</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <button>Live Demo</button>
            <button>More Info & Source</button>
        </div>
    </div>
</div>

<style>

    .project {
        display: flex;
        flex-direction: row;
        align-items: center;

    }

    .spotlight {
        flex: 1;

    }

    .info {
        flex: 1;
    }
</style>
