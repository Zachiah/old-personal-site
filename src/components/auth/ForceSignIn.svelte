<script>
    import {User} from "/sveltefire.js";

    import {goto} from "@sapper/app";
</script>

<User>
    <slot></slot>

    <div slot="signed-out">
        {goto('/sign-in')}
    </div>
</User>