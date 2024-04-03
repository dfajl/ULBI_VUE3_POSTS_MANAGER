import { createApp } from 'vue';
// это самый первый импорт в приложении на Vue. мы ипортируем в наше приложение функцию, отвечающую за создание приложения

import App from '@/App.vue';
//импорт корневого компонента из VUE. он лежит в src. это точка входа в приложение

import components from '@/components/UI/exportComponents'; // импортируем пользовательские компоненты
import router from '@/router/router';
import store from '@/vuex/store';
import directives from '@/directives/exportDirectives'; // импортируем пользовательские директивы

const app = createApp(App);
//создаем приложение на основе корневого компонента

// это и есть глобальная регистрация компонентов
components.forEach((component) => {
	app.component(component.name, component);
});

// это и есть глобальная регистрация директивы/ 'intersection' - is a string with an our own directive's name
directives.forEach((directive) => {
	app.directive(directive.name, directive);
});

app.use(router).use(store).mount('#app');
//у нашего компонента App есть метод mount('#app'), который позволяет вмонтировать компонент App
// <div id="app"></div>
