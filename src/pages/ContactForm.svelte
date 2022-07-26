<h2 class="cta">Let's work together!</h2>
<div class="box">
    <div class="contact">
        <form action="https://formspree.io/f/mzbondka" method="POST">
            <label>
                <h4>Your Email:</h4>
                <input
                    type="email"
                    name="email"
                    placeholder="my@email.com"
                    required="true"
                />
            </label>
            <label class="body">
                <h4>Message:</h4>
                <textarea
                    name="message"
                    placeholder="Hello world!"
                    required="true"
                />
            </label>
            <!-- your other form fields go here -->
            <button class="button" type="submit">Send</button>
        </form>
    </div>
</div>

<style>
    /* .cta {
        text-decoration: underline;
    } */

    h4 {
        text-align: left;
        margin: 1rem 0;
    }

    .box {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 90%;
        margin: auto;
    }

    .contact {
        width: 100%;
        height: 500px;
        max-width: 800px;
        background: #0000008f;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 0.75;
        gap: 10px;
        /* justify-content: center; */
    }

    label {
        width: 100%;
        position: relative;
    }

    input,
    textarea {
        min-width: 100%;
        max-width: 100%;
        background: none;
        border: none;
        border-bottom: #55535e 2px solid;
        border-radius: 1px;
        box-sizing: border-box;
        resize: none;
        color: whitesmoke;
        font-size: 1rem;
        font-family: "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            "Helvetica Neue", sans-serif;
    }

    input {
        height: 2rem;
    }

    textarea {
        height: 6rem;
    }

    textarea:focus,
    input:focus {
        /* outline: none; */
        outline: 3px rgba(245, 245, 245, 0.469) solid;
        outline-offset: 5px;
        border-bottom: #55535e00 2px solid;
        caret-color: whitesmoke;
    }
</style>
