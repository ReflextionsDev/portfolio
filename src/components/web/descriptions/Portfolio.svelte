<script>
	import ImageSpan from './../../ImageSpan.svelte';

    let gallery1 = [
        {
            src: "/assets/projects/portfolio/mockup1.png",
            alt: "",
        },
        {
            src: "/assets/projects/portfolio/mockup3.png",
            alt: "",
        },
        {
            src: "/assets/projects/portfolio/mockup4.png",
            alt: "",
        },
    ]
    

    
</script>

<!-- Build image / text split component, with reverse prop
Text takes many paragraphs or whatever, image displays in list
-->

<div>
    <h3>About</h3>

    <p>
        I decided to work in Svelte because almost all my course work at the
        time was in React. I wanted to challenge myself to get comfortable with
        a new (though fairly similar) framework, and I liked the design
        philosophy behind Svelte.
    </p>

    <ImageSpan images={gallery1}/>

    <h3>Process</h3>

    <p>
        I started out by mocking up some designs in Figma, attempting to figure
        out how to display my games portfolio. The most challenging part was
        coming up with a good solution to preview both mobile and desktop games.
        I tried a few layouts for both the game page and the portfolio page.
    </p>

    <!-- > FIGMA IMAGES < -->

    <p>
        Once I had a few designs to choose from, I got to work implementing the
        game pages. Feeling inspired by some examples on codepen, I built a
        phone and laptop frame out of pure CSS. I also implemented basic routing
        with page.js.
    </p>

    <!-- > DEVICE IMAGES < -->

    <p>
        The theme felt OK, but it felt a bit bare, and I wanted something more
        creative for a personal site. I started by switching to a dark theme,
        and then adding more color.
    </p>

    <!-- > EARLY SITE IMAGES < -->

    <p>
        These layouts also ended up being too wide to have a large enough game
        preview windows, so I adjusted them to the current layout.
    </p>

    <p>
        With a functional games section, I moved on to the web page, starting
        with the responsive header and splash image. I then fleshed out the
        skills section. At this point I revisited the game page, which needed
        more work to fit the theme. I updated the portfolio and showcase
        template to match the theme, and converted the game pages to modals.
        Here I also did a big responsiveness pass to make sure the site looked
        good across devices.
    </p>

    <!-- > POTENTIAL MODAL IMAGES < -->

    <p>
        Building the data structure and component composition for the games
        portfolio made implementing the web projects fairly straight forward. I
        also implemented a contact page using formspree.
    </p>

    <h3>A deeper dive</h3>

    <h4>Device Components</h4>

    <p>
        Initially the Phone.svelte and Laptop.svelte component had no shared
        code. I drew them up quick and dirty, and they needed some work to fit
        more robust use cases. I started by switching the device content to a
        component which each device could use. I setup DeviceContent.svelte so
        that it could display either a static image, a gif, or an embedded
        preview of the game depending on props and if the user is on an
        appropriate device.
    </p>

    <h4>Project Composition</h4>

    <p>
        For each category of project (web projects, other web projects, game
        projects), I built an array of objects in stores.js with all relevant
        data. This would make it easy to pull in and filter all games based on
        tag, or other defined parameters.
    </p>

    <h4>Responsive Navbar</h4>

    <p>
        The navbar took a bit of trial and error to find what worked. Initially
        I tried automatically collapsing it once you had scrolled past a certain
        point, but it didn’t look right. I also experimented with some
        scroll-jacking but thankfully decided against it. Ultimately, I realized
        it would probably look best to adjust the angle in real time. Making
        that work was easier than I thought, I just had to define a start and
        end position, and adjust the skew angle according to the scroll position
        relative to that area.
    </p>

    <h4>Angled Sections</h4>

    <p>
        When refactoring to the dark theme, I came up with the idea of the
        angled navbar which I really liked. But I also had to bring the rest of
        the website in line. I tried a lot of solutions for drawing angled
        backgrounds in CSS: borders, angled boxes, clip-path, transform, etc. I
        found a more elegant solution with the psuedo elements ::before and
        ::after, using clip-path to display shadows appropriately. Finally, I
        built the Section.svelte component with top and bottom props to
        conditionally render the angled borders.
    </p>

    <!-- <h4>Routing Troubles</h4>

    <p>To do</p>

    <h4>Optimization</h4>

    <p>To do, hash routing and static hosting</p>  -->

    <h3>Old Portfolios</h3>

    <p>
        As mentioned in the description, I’ve built a few portfolio sites with
        Wordpress before. Here are the archived pages:
    </p>

    <ul>
        <li>
            <a
                href=" https://web.archive.org/web/20190531181500/https://www.nathanbennett.io/"
                target="archive"
            >
                nathanbennett.io
            </a>
        </li>
        <li>
            <a
                href=" https://web.archive.org/web/20191025023446/http://reflextionsdev.com/"
                target="archive"
            >
                reflextionsdev.com
            </a>
        </li>
        <li>
            <a
                href="https://web.archive.org/web/20190531181440/https://www.nurobit.com/"
                target="archive"
            >
                nurobit.com
            </a>
        </li>
    </ul>
</div>

<style>

    h3 {
        /* text-align: left; */
    }

    h4 {
        text-align: left;
        padding: 0;
        margin: 0;
    }

    p {
        font-size: 0.85rem;
        text-align: left;
    }
</style>
