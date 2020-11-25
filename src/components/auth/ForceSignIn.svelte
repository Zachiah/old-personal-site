<script>
    import {User} from "/sveltefire.js";
</script>

<User persist={sessionStorage}>
    <slot></slot>

    <div slot="signed-out">
        You have to have an account to visit this page <a href="/sign-in">Sign In</a> <a href="/sign-up">Sign up</a>
    </div>
</User>