import { usePostsStore } from '../stores/pinia/postModulePinia';
import { storeToRefs } from 'pinia';

export default function usePiniaStore() {
	const store = usePostsStore(); // инициализация стора

	//получаем стейт и геттеры стора
	const {
		isPostsLoading,
		selectedSort,
		searchQuery,
		page,
		totalPages,
		posts,
		sortOptions,
		sortedPosts,
		sortedAndSearchPosts,
	} = storeToRefs(store);

	const setSearchQuery = (query) => {
		store.searchQuery = query;
	};
	const setSelectedSort = (query) => {
		store.selectedSort = query;
	};
	const setPosts = (newPosts) => {
		store.posts = newPosts;
	};

	//инициализация actions
	const loadPosts = () => {
		store.fetchPosts();
	};
	const infinityPostsScroll = () => {
		store.loadInfinityPosts();
	};

	return {
		isPostsLoading,
		selectedSort,
		searchQuery,
		sortOptions,
		sortedPosts,
		sortedAndSearchPosts,
		page,
		totalPages,
		posts,
		infinityPostsScroll,
		setSearchQuery,
		setSelectedSort,
		setPosts,
		loadPosts,
	};
}
