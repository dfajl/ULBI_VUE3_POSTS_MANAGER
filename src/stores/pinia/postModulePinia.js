import axios from 'axios';
import { defineStore } from 'pinia';

export const usePostsStore = defineStore('postModule', {
	// Options API like

	state: () => ({
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
	}),
	getters: {
		sortedPosts() {
			return [...this.posts].sort((post1, post2) => {
				return post1[this.selectedSort]?.localeCompare(
					post2[this.selectedSort],
				);
			});
		},
		sortedAndSearchPosts() {
			return this.sortedPosts.filter((post) =>
				post.title
					.toLowerCase()
					.includes(this.searchQuery.toLowerCase()),
			);
		},
	},
	actions: {
		async fetchPosts() {
			try {
				this.isPostsLoading = true;
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/posts?',
					{
						params: {
							_page: this.page,
							_limit: this.limit,
						},
					},
				);
				this.totalPages = Math.ceil(
					response.headers['x-total-count'] / this.limit,
				);
				this.posts = response.data;
				this.isPostsLoading = false;
				return this.totalPages; // нужно только для директивы v-intersection
			} catch (error) {
				alert(`Ошибка: ${error}`);
			} finally {
				this.isPostsLoading = false;
			}
		},
		async loadInfinityPosts() {
			try {
				this.page += 1;
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/posts?',
					{
						params: {
							_page: this.page,
							_limit: this.limit,
						},
					},
				);
				this.totalPages = Math.ceil(
					response.headers['x-total-count'] / this.limit,
				);
				this.posts = [...this.posts, ...response.data];
			} catch (error) {
				console.log(`Ошибка: ${error}`);
			} finally {
				this.isPostsLoading = false;
			}
		},
	},
});
