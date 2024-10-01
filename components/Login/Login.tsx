import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg px-8 py-14 w-1/3">
        <div className="flex items-center justify-center mb-4">
          <a href="https://www.cottonculture.co.in">
            <img
              alt="logo"
              src="https://cdn.shopify.com/s/files/1/0883/8204/6526/files/coooo-280x280_200x60@2x.webp?v=1721391526.webp"
              className="w-32 h-auto"
            />
          </a>
        </div>

        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Log in</h1>
          <h3 className="text-gray-500">
            Enter your email and we'll send you a login code
          </h3>
        </div>

        {/* Warning Banner for Offline */}
        {/* <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
          <p>You are offline. Reconnect or refresh the page to log in.</p>
        </div> */}

        {/* Warning Banner for Captcha */}
        {/* <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
          <p>Something prevented the captcha from loading. Try disabling your ad blocker or reload the page.</p>
        </div> */}

        {/* Login Form */}
        <form
          id="account_lookup"
          action="/88382046526/identity/lookup"
          method="post"
        >
          <div className="mb-4">
            <label
              htmlFor="account_email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="account[email]"
              id="account_email"
              required
              autoComplete="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="your-email@example.com"
            />
          </div>

          {/* Captcha */}
          {/* <div className="flex justify-center mb-4">
            <span className="ui-spinner animate-spin h-5 w-5 border-4 border-t-transparent border-gray-400 rounded-full"></span>
          </div> */}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </form>

        <footer className="mt-4 text-left">
          <a
            href="https://www.cottonculture.co.in/88382046526/policies/38726172990.html?locale=en"
            className="text-blue-600 hover:underline"
          >
            Privacy
          </a>
        </footer>
      </div>
      {/* <div class="headings-container">
  <div>
    <h1 class="ui-heading">Enter code</h1>
    <h3 class="ui-subheading ui-subheading--subdued">Sent to s.danish0827@gmail.com</h3>
  </div>
</div> */}
    </div>
  );
};

export default Login;
