 const mainLinks = (isAuthenticated, user) => {
     if(isAuthenticated){
        return  [
            {
                title: `${user.name}`,
                linkTo: `/dashboard` 
            },
            {
                title: 'Articles',
                linkTo: '/articles' 
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
                title: 'Portfolio',
                linkTo: '/portfolios' 
            },
            {
                title: 'My Cart',
                linkTo: '/cart' 
            },
            {
                title: 'My Todos',
                linkTo: '/todo'
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
                title: 'Articles',
                linkTo: '/articles' 
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
                title: 'Portfolio',
                linkTo: '/portfolios' 
            },
            {
                title: 'Todos',
                linkTo: '/todo' 
            },
        ];
     }
}

export default mainLinks