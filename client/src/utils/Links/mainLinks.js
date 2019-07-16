 const mainLinks = (isAuthenticated, user) => {
     console.log(isAuthenticated);
     if(isAuthenticated){
        return  [
            {
                title: `${user.name}`,
                linkTo: `/dashboard` 
            },
            {
                title: 'Dashboard',
                linkTo: '/dashboard' 
            },
            {
                title: 'Posts',
                linkTo: '/posts' 
            },
            {
                title: 'Products',
                linkTo: '/products' 
            },
            {
                title: 'My Cart',
                linkTo: '/cart' 
            },
            {
                title: 'Logout',
                linkTo: '/' 
            }
        ]
     } else {
        return [
            {
                title: 'Login',
                linkTo: '/login' 
            },
            {
                title: 'Posts',
                linkTo: '/posts' 
            },
            {
                title: 'Products',
                linkTo: '/products' 
            },
        ];
     }
}

export default mainLinks