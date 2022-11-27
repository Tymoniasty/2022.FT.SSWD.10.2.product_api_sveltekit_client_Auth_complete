<script>
	import { onMount } from 'svelte';
	import { isAuthenticated, user } from '../stores/authStore';
	import auth from '../authService';

	let auth0Client = null;

	// onMount runs after the page loads
	onMount(async () => {
		// Setup Auth0 client
		auth0Client = await auth.createClient();
		// Set the authenticated state in the store
		isAuthenticated.set(await auth0Client.isAuthenticated());
		// Get the logged in user - if any
		user.set(await auth0Client.getUser());
	});

	// Handle login requests - e.g. clicking the link
	// login via the client
	const login = () => {
		console.log('login');
		auth.loginWithPopup(auth0Client);
	};

	// Handle logout requests - e.g. clicking the link
	const logout = () => {
		auth.logout(auth0Client);
	};
</script>

<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
	<div class="container">
		<a class="navbar-brand" href="/">Products App</a>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarResponsive"
			aria-controls="navbarResponsive"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarResponsive">
			<ul class="navbar-nav ml-auto">
				<li class="nav-item active">
					<a class="nav-link" href="/"
						>Home
						<span class="sr-only" />
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/about">About</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/services">Services</a>
				</li>
				<li class="nav-item">
					{#if $isAuthenticated == false}
						<button on:click={() => login()} type="button" class="btn nav-link">Login</button>
					{:else}
						<button on:click={() => logout()} type="button" class="btn nav-link">Logout</button>
					{/if}
				</li>
			</ul>
		</div>
	</div>
</nav>
<!-- End Nav -->

<slot />
