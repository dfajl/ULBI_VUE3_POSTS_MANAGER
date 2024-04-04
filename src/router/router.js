import Main from '@/pages/Main';
import About from '@/pages/About';
import PostIdPage from '@/pages/PostIdPage';
import PostsPageVuex from '@/pages/PostsPageVuex';
import PostsPagePinia from '@/pages/PostsPagePinia';
import { createRouter, createWebHistory } from 'vue-router';

//маршруты
const routes = [
	{
		path: '/',
		component: Main, //компонент, который будет отрисован по данному маршруту
	},
	{
		path: '/about',
		component: About, //компонент, который будет отрисован по данному маршруту
	},
	{
		path: '/posts/:id', //динамическая навигация. :id - динамический параметр прехода
		component: PostIdPage, //компонент, который будет отрисован по данному маршруту
	},
	{
		path: '/posts',
		component: PostsPagePinia, //компонент, который будет отрисован по данному маршруту
	},
];

//создаем роутер
const router = createRouter({
	routes: routes,
	history: createWebHistory(process.env.BASE_URL),
});

export default router;
