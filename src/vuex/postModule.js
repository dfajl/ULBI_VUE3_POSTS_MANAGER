import axios from 'axios';

export const postModule = {
	// само состояние приложения. массив данных, набор опции и прочая атрибутика приложения
	state() {
		return {
			posts: [],
			isPostsLoading: false,
			selectedSort: '',
			searchQuery: '',
			page: 1, //номер страницы
			limit: 10, //кол-во постов на странице
			totalPages: 0, //кол-во страниц
			sortOptions: [
				{
					value: 'title',
					name: 'По названию',
				},
				{
					value: 'body',
					name: 'По содержанию',
				},
			],
		};
	},

	// кэшируемые вычисляемые св-ва приложения. сюда можно перенести вычисляемые св-ва компонента
	getters: {
		sortedPosts(state) {
			console.log('computed сработал в sortedPosts');
			return [...state.posts].sort((post1, post2) => {
				return post1[state.selectedSort]?.localeCompare(
					post2[state.selectedSort],
				);
			});
			/* почему важно сделать проверку на существование свойства: потому что у нас вначале идет сортировка по пустой строке(selectedSort: ''). без ? левая часть будет is nоt defined и будет ошибка, потому что метод localeCompare обращается к is nоt defined. у post2 проверка не нужна, т.к. к нему нет метода изначально
			 */
		},
		sortedAndSearchPosts(state, getters) {
			console.log('computed сработал в sortedAndSearchPosts');
			console.log(getters.sortedPosts); // [] при загрузке страницы

			return getters.sortedPosts.filter((post) =>
				post.title
					.toLowerCase()
					.includes(state.searchQuery.toLowerCase()),
			);
		},

		/* 
			работа вычисляемых свойств sortedPosts() и sortedAndSearchPosts(): при первом запуске страницы   sortedAndSearchPosts() веренет пустой массив [], потому что посты еще не загружены из-за тайм-аута в 4 секунды, а в this.posts лежит пустой массив. Фильтрация по пустому массиву вернет пустой массив. Потом посты подгружаются. Цепочка повторяется: вызывается sortedAndSearchPosts(), потому что меняется привязка в виде this.posts. sortedAndSearchPosts() в свою очередь вызывает sortedPosts(), который клонирует массив this.posts, но сортировку не делает, т.к. post1[this.selectedSort]?.localeCompare() не проходит из-за this.selectedSort == "".
			
			
			
			но свойство отрабатывает: ведь был изменен массив this.posts(подвергся сортировке), за которым "следит" sortedPosts(). 
			Потом сразу же запускается sortedAndSearchPosts(), потому что сработало св-во  sortedPosts(), за которым и следит sortedAndSearchPosts(). Отфильтрованный пустой массив вернется данным свойством.

			потом проходит таймаут и посты грузятся. следовательно, массив this.posts изменяется, срабатывает sortedPosts(), но сортировка не запускается, потому что post1[this.selectedSort]?.localeCompare() не срабатывает,  т.к. this.selectedSort изначально равен пустой строке. ну и sortedAndSearchPosts(), соответственно, не вызывается, потому что this.posts
		*/
	},

	//состояние нельзя поменять напрямую. только через мутации
	mutations: {
		setPosts(state, posts) {
			state.posts = posts;
		},
		setPage(state, page) {
			state.page = page;
		},
		setSelectedSort(state, selectedSort) {
			state.selectedSort = selectedSort;
		},
		setTotalPages(state, totalPages) {
			state.totalPages = totalPages;
		},
		setSearchQuery(state, searchQuery) {
			state.searchQuery = searchQuery;
		},
		setLoading(state, boolean) {
			state.isPostsLoading = boolean;
		},
	},

	// асинхронные мутации. НЕ рекомендуется менять стейт напрямую через actions. сначала вызываем мутацию
	// внутри actions. яркий пример - это получение данных с сервера
	actions: {
		async fetchPosts({ state, commit, dispatch }) {
			// commit - для вызова мутации
			// dispatch - для вызова других actions
			// все поля this меняем на state
			try {
				/* this.isPostsLoading = true;
				setTimeout(async () => {
					const response = await axios.get(
						'https://jsonplaceholder.typicode.com/posts?',
						{
							//то есть передали параметры в строку с адресом
							// https://jsonplaceholder.typicode.com/posts?_page_limit
							params: {
								_page: this.page,
								_limit: this.limit,
							},
						},
					);
					this.totalPages = Math.ceil(
						// округлили в большую сторону
						response.headers['x-total-count'] / this.limit,
					);
					this.posts = response.data;
					console.log(this.posts);
					this.isPostsLoading = false;
				}, 5000); */
				/* раньше тут был этот код с setTimeout. но из-за задержки в 500мс 
				async loadInfinityPosts() выполнялась раньше. поэтому setTimeout надо убрать. просто оставлю 
				как пример async/await внутри setTimeout 
				P.S. Если хочешь проверить, как подгружаются посты при setTimeout == 5000,
				поставь this.isPostsLoading = false в конец функции loadInfinityPosts()
				*/

				commit('setLoading', true); // вызываю мутацию setLoading с передачей туда параметра true
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/posts?',
					{
						//то есть передали параметры в строку с адресом
						// https://jsonplaceholder.typicode.com/posts?_page_limit
						params: {
							_page: state.page,
							_limit: state.limit,
						},
					},
				);
				commit(
					'setTotalPages',
					Math.ceil(
						// округлили в большую сторону
						response.headers['x-total-count'] / state.limit,
					),
				);
				commit('setPosts', response.data);
				commit('setLoading', false); // вызываю мутацию setLoading с передачей туда параметра false
				return state.totalPages; // нужно только для директивы v-intersection
			} catch (error) {
				alert(`Ошибка: ${error}`);
			}
			/* finally {
				this.isPostsLoading = false; // по-хорошему, надо использовать блок finally
			} */
		},
		//changePage(number) {
		//this.page = number; реализую параллельно бесконечную ленту
		//},
		async loadInfinityPosts({ commit, state }) {
			// реализуем бесконечную ленту
			/* 
				при первоначальной отрисовки вторая 20ка постов уже подгружена. в следующий раз данная функция будет вызвана только при скролле после 20го поста

			*/

			try {
				commit('setPage', (state.page += 1));
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/posts?',
					{
						//то есть передали параметры в строку с адресом
						// https://jsonplaceholder.typicode.com/posts?_page_limit
						params: {
							_page: state.page,
							_limit: state.limit,
						},
					},
				);
				commit(
					'setTotalPages',
					Math.ceil(
						// округлили в большую сторону
						response.headers['x-total-count'] / state.limit,
					),
				);
				commit('setPosts', [...state.posts, ...response.data]);
				console.log(state.posts);
				//мы при прокрутке страницы складываем все подгруженные посты в единый массив
			} catch (error) {
				console.log(`Ошибка: ${error}`);
			}
			/* finally {
				this.isPostsLoading = false; // по-хорошему, надо использовать блок finally
			} */
		},
	},
	namespaced: true, //у модуля теперь будет имя для регистрации его внутри компонента
};
