import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default function useStoreComposable() {
	const store = useStore(); // инициализация стора

	//инициализация стейта стора
	const posts = computed(() => store.state.post.posts);
	const isPostsLoading = computed(() => store.state.post.isPostsLoading);
	const selectedSort = computed(() => store.state.post.selectedSort);
	const searchQuery = computed(() => store.state.post.searchQuery);
	const page = computed(() => store.state.post.page); //номер страницы
	const totalPages = computed(() => store.state.post.totalPages); //кол-во страниц
	const sortOptions = computed(() => store.state.post.sortOptions);

	//инициализация геттеров стора
	const sortedPosts = computed(() => store.getters['post/sortedPosts']);
	const sortedAndSearchPosts = computed(
		() => store.getters['post/sortedAndSearchPosts'],
	);

	//инициализация мутаций стора
	const setSearchQuery = (searchQuery) => {
		store.commit('post/setSearchQuery', searchQuery);
	};
	const setSelectedSort = (searchQuery) => {
		store.commit('post/setSelectedSort', searchQuery);
	};
	const setPosts = (newPosts) => {
		store.commit('post/setPosts', newPosts);
	};

	//инициализация actions
	const loadPosts = () => {
		store.dispatch('post/fetchPosts');
	};
	const loadInfinityPosts = () => {
		store.dispatch('post/loadInfinityPosts');
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
		loadInfinityPosts,
		setSearchQuery,
		setSelectedSort,
		setPosts,
		loadPosts,
	};
}
