<script>
  import { Email, Github, Linkedin } from "../icons/icons.js";

  import { iconSize } from "../../stores.js";
</script>

<div class="info content">
  <div class="info__title content__section">
    <h1>Nathan Bennett</h1>
    <h2>Fullstack Web & Game Development</h2>
  </div>

  <div class="info__body content__text content__section">
    <p>
      I'm an experienced developer interested in building things and solving
      problems. I'm passionate about collaboration across teams of various
      disciplines and creating better user experiences with creativity.
    </p>
    <p>
      I started coding since I was a teenager; creating and selling web games
      and I've worked as a professional QA Tester on AAA franchises. As a
      fullstack web developer, I am equipped and capable of tying together full
      service websites and applications, from enterprise-level systems to
      bespoke solutions.
    </p>
  </div>

  <div class="info__links content__section">
    <a
      href="https://github.com/ReflextionsDev"
      target="new"
      class="info__link hvr-grow"
    >
      <Github size={$iconSize} color={"#FFFFFF"} />
      <h4>Github</h4>
    </a>

    <a
      href="mailto:nlb.nathan@gmail.com"
      target="new"
      class="info__link hvr-grow"
    >
      <Email size={$iconSize} color={"#EA4335"} />
      <h4>Email</h4>
    </a>
    <a
      href="https://www.linkedin.com/in/nathanlbennett/"
      target="new"
      class="info__link hvr-grow"
    >
      <Linkedin size={$iconSize} color={"#0A66C2"} />
      <h4>Linkedin</h4>
    </a>
  </div>
</div>

<style>
  .info__links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10%;
    row-gap: 10px;
    flex-wrap: wrap;
    padding: 15px 0px;
  }

  .info__link {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10%;
    border-radius: 8px;
    padding: 0px 15px;
    transition: all 0.1s ease-out;
    text-decoration: none;
    color: whitesmoke;
  }

  .info__link:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.6);
    text-decoration: underline;
  }

  /* Hover CSS by @IanLunn https://github.com/IanLunn/Hover */
  .hvr-grow {
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
    transition-property: transform;
  }

  .hvr-grow:hover,
  .hvr-grow:focus,
  .hvr-grow:active {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
