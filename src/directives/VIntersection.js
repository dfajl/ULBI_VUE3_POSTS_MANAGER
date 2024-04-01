/* создаем собственную переиспользуемую директиву */

export default {
	mounted(el, binding) {
		console.log(el); // <div class="observer"></div>
		console.log(binding); // binding - объект, где в поле value лежит функция, которую я передаю при вызове директивы

		//intersectionObserverAPI
		const options = {
			//параметры поиска пересечения
			root: document.querySelector('#scrollArea'), //область видимости браузера
			rootMargin: '0px',
			threshold: 1.0,
		};

		// эта функция будет срабатывать при пересечении блока-маяка
		const callback = (entries, observer) => {
			console.log(entries);
			console.log(observer);

			/* 
					по умолчанию функция срабатывает при пересечении вверх и вниз. а нам надо только вниз.
					чтобы исправить это поведение, надо следить за свойством isIntersecting массива entries
				*/
			if (
				//не вызываем директиву, когда ВСЕ 100 постов загружены
				entries[0].isIntersecting
			) {
				console.log('crossed');
				/* console.log(binding.value.method.returnPageNumber());
				console.log(binding.value.method.returnTotalPages()); */
				binding.value.method(); // вызываем функцию, которую передали в объект binding
			}
		};

		const observer = new IntersectionObserver(callback, options);
		observer.observe(el); // указываем то, за чем будем следить
	},
	name: 'intersection',
};

/* 
	как работает дирктива:
	изначально, при монтировке PostPage, вызывается хук mounted в данной директиве. Код полностью выполняется, до условия, но 
	пересечения не было и функция loadInfinityPosts() не вызывается. 

	Листаем страницу вниз, доходим до блока-маяка, через binding сюда переданы кол-во страниц и номер текущей страницы (10 и 1,binding.value.method.returnTotalPages() и binding.value.method.returnPageNumber(), соотвтственно ). Условие выполено, вызываем loadInfinityPosts(). 
	Модели в PostPage обновились. Номер страницу там уже == 2. 

	Листаем вниз, доходим до блока-маяка, через binding сюда переданы кол-во страниц и номер текущей страницы (10 и 2). Условие выполено, вызываем loadInfinityPosts(). 
	Модели в PostPage обновились. Номер страницу там уже == 2. 

	Что примечательно, при пересечении вызывается только const callback, код сверху не срабатывает
*/
