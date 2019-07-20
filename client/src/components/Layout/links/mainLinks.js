 const mainLinks = (isAuthenticated, user) => {
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
                title: 'Todos',
                linkTo: '/todo' 
            },
        ];
     }
}

export default mainLinks