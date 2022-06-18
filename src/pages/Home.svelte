<script>
    import Games from "./Games.svelte";

    import Skills from "./../components/Skills.svelte";
    import Info from "./../components/Info.svelte";
    import Nav from "../components/Nav.svelte";
    import Splash from "./Splash.svelte";

    function scrollIntoView({ target }) {
          const el = document.querySelector(target.getAttribute('href'));
          if (!el) return;
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  </script>
  
  <nav>
      <a href=".tabs" on:click|preventDefault={scrollIntoView}>Section 1</a>
      <a href="#section-2" on:click|preventDefault={scrollIntoView}>Section 2</a>
      <a href="#section-3" on:click|preventDefault={scrollIntoView}>Section 3</a>
  </nav>
  
  <main>
      <section id="section-1">
          <h2>
              Section 1
          </h2>
      </section>
  
      <section id="section-2">
          <h2>
              Section 2
          </h2>
      </section>
  
      <section id="section-3">
          <h2>
              Section 3
          </h2>
      </section>
  </main>
  
<!-- Intro, Skills, Projects, Contact and Resume PDF at bottom of page -->
<!-- Could move about section to below projects w/ resume -->
<!-- Pass in background color as var -->

<div>
    <Splash />

    <Skills />
    <Skills />
    <Skills />
</div>

<style>
</style>
