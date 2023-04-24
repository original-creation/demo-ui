<template>
    <nav>
        <ul class="nav-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/demo">Start demo</router-link></li>
            <li>
                <a href="#">Products</a>
                <ul class="sub-nav-links">
                    <li><a href="#">Product 1</a></li>
                    <li><a href="#">Product 2</a></li>
                    <li><a href="#">Product 3</a></li>
                </ul>
            </li>
            <li><router-link to="/contact">Contact Us</router-link></li>
        </ul>
    </nav>
</template>
<style scoped>
nav {
    background-color: #333;
    color: #fff;
}

.nav-links {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 10px;
}

.nav-links li {
    position: relative;
}

.nav-links a {
    color: #fff;
    display: block;
    padding: 10px;
    text-decoration: none;
    transition: background-color 0.2s ease;
    background-color: #333;
    /* default background color */
}

.nav-links a:hover {
    background-color: #555;
}

.nav-links a.selected {
    background-color: transparent;
}

.sub-nav-links {
    background-color: #555;
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0;
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
}

.sub-nav-links li {
    display: block;
}

.nav-links li:hover .sub-nav-links {
    display: block;
    opacity: 1;
}

@media screen and (max-width: 600px) {
  .nav-menu {
    display: none;
  }
  .nav-toggle {
    display: block;
  }
  .nav-menu ul {
    flex-direction: column;
  }
  .nav-menu li {
    margin: 10px 0;
  }
  .nav-item-has-submenu:hover .submenu {
    display: none;
  }
  .nav-toggle.active ~ .nav-menu {
    display: block;
  }
}
</style>
  
  