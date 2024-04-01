<template>
	<div>
		<h1 style="text-align: center">Страница с постами</h1>
		<div class="fakeBtnWrapper"></div>
		<!-- это фейковый блок, чтобы при абсолютном позиционировании инпут не смещался вверх -->

		<div class="btn_wrapper">
			<my-button class="titleBtn" @click="showDialog">
				Создать пост
			</my-button>
			<my-button @click="fetchPosts">Загрузить посты</my-button>
			<my-select v-model="selectedSort" :options="sortOptions">
			</my-select>
		</div>

		<my-dialog-window v-model:show="dialogVisible">
			<post-form @create="createPost"></post-form>
		</my-dialog-window>
		<my-input
			placeholder="Найти пост"
			@input="searchPosts"
			v-model="searchQuery"
			v-focus
		/>
		<post-list
			v-if="!isPostsLoading"
			:posts="sortedAndSearchPosts"
			@delete="deletePostItem"
		>
		</post-list>
		<div class="post-item_wrapper" v-else>Загружаю посты с сервера :)</div>

		<div
			class="observer"
			v-intersection="{
				method: {
					loadInfinityPosts,
					returnTotalPages,
					returnPageNumber,
				},
			}"
		></div>
		<!-- это некий блок-маяк, долистав до которого, включится определенная логика 
		цвет ему задавать не надо. но я сделаю просто для наглядности-->

		<!-- <div class="page_wrapper">
			<div
				v-for="pageNumber in totalPages"
				:key="pageNumber"
				@click="changePage(pageNumber)"
				class="page"
				:class="{
					currentPage: pageNumber == page,
				}"
			>
				{{ pageNumber }}
			</div>
		</div> убрал данный блок и логику по нему в комментарии. реализуем бесконечную ленту с помощью 
		<div class="observer"></div>
	-->
	</div>
</template>

<script>
	import PostForm from '@/components/PostForm';
	import PostList from '@/components/PostList';
	import axios from 'axios';

	export default {
		components: {
			PostForm,
			PostList,
		},
		data() {
			return {
				posts: [],
				dialogVisible: false,
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
					{
						value: 'number',
						name: 'По идентификатору',
					},
				],
			};
		},
		methods: {
			createPost(post) {
				console.log(post);
				this.posts.push(post);
				this.dialogVisible = false;
			},
			deletePostItem(post) {
				this.posts = this.posts.filter((item) => item.id != post.id);
				//this.posts.splice(post.id - 1, 1);
				/* splice для удаления не подойдет, потому что у постов нумерация идет с 1, а в массиве - с 0  */
			},
			showDialog() {
				this.dialogVisible = true;
			},
			async fetchPosts() {
				try {
					this.isPostsLoading = true;

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
					this.isPostsLoading = false;
				} catch (error) {
					alert(`Ошибка: ${error}`);
				}
				/* finally {
					this.isPostsLoading = false; // по-хорошему, надо использовать блок finally
				} */
			},
			/* changePage(number) {
				this.page = number; реализую параллельно бесконечную ленту
				this.fetchPosts();
			}, */
			async loadInfinityPosts() {
				// реализуем бесконечную ленту
				/* 
					при первоначальной отрисовки вторая 20ка постов уже подгружена. в следующий раз данная функция будет вызвана только при скролле после 20го поста

				*/

				try {
					this.page += 1;

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

					this.posts = [...this.posts, ...response.data];
					//console.log(this.posts);

					//мы при прокрутке страницы складываем все подгруженные посты в единый массив
				} catch (error) {
					alert(`Ошибка: ${error}`);
				}
				/* finally {
					this.isPostsLoading = false; // по-хорошему, надо использовать блок finally
				} */
			},
			returnTotalPages() {
				console.log(this.totalPages);
				return this.totalPages;
				// нужно только для директивы v-intersection. Динамически обновляем кол-во страниц
			},
			returnPageNumber() {
				console.log(this.page);
				return this.page;
			},
		},
		watch: {
			//page() { реализую параллельно бесконечную ленту
			//this.fetchPosts();
			/* 
					следим за сменой номера страницы из метода changePage. при изменении модели page вызываем 
					подгрузку новых постов
				*/
			//},

			//реализую сортировку по айдишнику
			selectedSort() {
				this.posts.sort((post1, post2) => {
					console.log(post1.id - post2.id);
					return post1.id - post2.id;
				});
			},
		},
		mounted() {
			this.fetchPosts();

			//intersectionObserverAPI
			//console.log(this.$refs.observer);
			//комменчу тут код, связанный с intersectionObserverAPI, потому что он будет вынесен в отдельную директиву
			//const options = {
			//root: document.querySelector('#scrollArea'), //область видимости браузера
			//	rootMargin: '0px',
			//	threshold: 1.0,
			//};

			// эта функция будет срабатывать при пересечении блока-маяка
			//const callback = (entries, observer) => {
			//console.log(entries);
			/* 
					по умолчанию функция срабатывает при пересечении вверх и вниз. а нам надо только вниз.
					чтобы исправить это поведение, надо следить за свойством isIntersecting массива entries
				*/
			//	if (entries[0].isIntersecting) {
			//		console.log('crossed');
			//		this.loadInfinityPosts();
			//	}
			//};

			//const observer = new IntersectionObserver(callback, options);
			//observer.observe(this.$refs.observer); // указываем то, за чем будем следить
		},

		// ниже будет реализована сортировка массива posts через watch и computed для наглядности
		/* watch: {
			selectedSort(newValue) {
				// название вотчера должно совпадать с названием изменяемой модели
				// следим за примитивом, поэтому не надо делать глубокое слежение
				// newValue - модель = selectedSort
				this.posts.sort((post1, post2) => {
					return post1[newValue]?.localeCompare(post2[newValue]);
				});
			},
		}, */
		computed: {
			sortedPosts() {
				console.log('computed сработал в sortedPosts');
				return [...this.posts].sort((post1, post2) => {
					return post1[this.selectedSort]?.localeCompare(
						post2[this.selectedSort],
					);
				});

				/* 
					Вопрос при прохождении курса: почему sortedAndSearchPosts срабатывает первым?
					при первой загрузке - понятно, св-во вызывается из шаблона. а потом, когда посты подгрузились?
					ведь первым будет изменяться модель this.posts и this.selectedSort, значит, sortedPosts должны вызваться раньше?
					при сортировке sortedAndSearchPosts все равно вызывается раньше. ПОЧЕМУ?
				*/

				/* 
					почему важно сделать проверку на существование свойства: потому что у нас вначале идет сортировка по пустой строке(selectedSort: ''). без ? левая часть будет is nоt defined и будет ошибка, потому что метод localeCompare обращается к is nоt defined. у post2 проверка не нужна, т.к. к нему нет метода изначально
				*/
			},
			sortedAndSearchPosts() {
				console.log('computed сработал в sortedAndSearchPosts');
				console.log(this.sortedPosts); // [] при загрузке страницы

				return this.sortedPosts.filter((post) =>
					post.title
						.toLowerCase()
						.includes(this.searchQuery.toLowerCase()),
				);
			},

			/* 

				Работа описана на момент одной подгрузки (будто разом загрузился весь массив this.posts).

				Работа вычисляемых свойств sortedPosts() и sortedAndSearchPosts(): при первом запуске страницы   sortedAndSearchPosts() веренет пустой массив [], потому что посты еще не загружены из-за тайм-аута в 4 секунды, а в this.posts лежит пустой массив. Фильтрация по пустому массиву вернет пустой массив. Потом посты подгружаются. Цепочка повторяется: вызывается sortedAndSearchPosts(), потому что (я так думаю) происходит перерисовка компонента <post-list> (хотя перерисовка - это результат срабатывания вычисляемого св-ва sortedAndSearchPosts). 

				Далее внутри sortedAndSearchPosts вызывается sortedPosts, подгруженные посты кладутся в копию массива 
				this.posts, но сортировка не происходит, потому что this.selectedSort - пустая строка. Следовательно, метод вернет копию изначального массива this.posts. 

				Если мы что-то пишем в инпуте, меняется модель this.searchQuery, срабатывает sortedAndSearchPosts, которая вызывает this.sortedPosts. В this.sortedPosts никакая модель не изменяется, возвращается изначальная копия массива this.posts, поиск произошел. Новый массив передался в пропсы <post-list>, произошла перерисовка.

				Потом я хочу отсортироваться. Заполняется модель this.selectedSort, вызывается sortedPosts() и сортируется КОПИЯ ИЗНАЧАЛЬНОГО МАССИВА this.posts, вызывается sortedAndSearchPosts() и туда передается отсортированный массив. Но ведь модель this.searchQuery заполнена, и мы фильтруемся по отсортированному массиву. Шаблон перерисовывается.
				
				Вот я начинаю очщать инпут. Меняется только модель this.searchQuery, св-во sortedPosts не вызывается, и происходит перерисовка на основании sortedAndSearchPosts.
			*/
		},
	};
</script>

<style lang="scss" scoped>
	.btn_wrapper {
		padding: 0 10px 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 2px solid teal;
		height: 50px;
		background: rgba(148, 146, 146, 0.205);
	}

	.fakeBtnWrapper {
		height: 50px;
		margin-top: 50px;
	}

	.post-item_wrapper {
		margin-top: 50px;
	}

	.page_wrapper {
		display: flex;
		margin-top: 50px;
		justify-content: center;
		.page {
			font-size: 20px;
			border: 1px solid black;
			margin-right: 10px;
			padding: 5px;
			cursor: pointer;
		}
	}

	.currentPage {
		background: rgba(46, 139, 86, 0.684);
	}

	.observer {
		height: 10px;
		background-color: aquamarine;
	}
</style>
