<template>
	<form @submit.prevent="createPost">
		<h4>Создание поста</h4>
		<my-input
			type="text"
			placeholder="Название"
			v-model="post.title"
			v-focus
		/>
		<!-- 
			если у тебя указан v-model="post.title", то это означает, что ты работаешь по дефолту, т.е. с атрибутом
			modelValue. Если же в ребенке указан другой пропс, то ты должен писать v-model:[имя атрибута]="post.title"
		 -->
		<div class="warning" v-if="emptyInputTitle">
			<p>Это поле не может быть пустым!</p>
		</div>
		<my-input type="text" placeholder="Описание" v-model="post.body" />
		<!-- 
            отличие v-bind от v-model в том, что последняя директива получает запись из инупта и кладет в указанную модель.  т.е. реализовано двустороннее связывание. эта директива работает  в элементах формы, чекбоксах, радиобаттонах, списках. чтобы использовать v-bind для двустороннего связывания, надо еще прослушивать события, н-ер, @input, иначе данные из модели будут идти в инпут, а из него в модель - нет.
        -->
		<div class="warning" v-if="emptyInputBody">
			<p>Это поле не может быть пустым!</p>
		</div>

		<my-button class="margin_btn" type="submit">Создать пост</my-button>
	</form>
</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				post: {
					title: '',
					body: '',
				},
				emptyInputTitle: false,
				emptyInputBody: false,
			};
		},
		methods: {
			createPost() {
				function showLog() {
					console.log(this); //undefind
				}
				showLog();

				let showConsoleLog = () => console.log(this);
				showConsoleLog();
				// а у стрелочных функций нет своего контекста. он взят у функции-родителя, т.е. у createPost()
				// поэтому в контекст выводим весь объект со данными, методами, вотчерами и т.д.

				/* Валидация инпутов */
				if (!this.post.title) {
					this.emptyInputTitle = true;
					return;
				} else if (!this.post.body) {
					this.emptyInputBody = true;
					return;
				}

				//event.preventDefault(); // можно с помощью модификатора на форме @submit.prevent
				this.post.id = Date.now();
				this.$emit('create', this.post);
				console.log(this.post);
				/*
					this.post.title = '';
					this.post.body = '';
					данный способ запишет пустые поля в новый созданный инпут. т.е. мы добавляем пустые поля в уже имеющийся объект. другими словами, перезаписываем наш новосозданный пост. чтобы обнулить инпуты из заголовка, нужно обнулять именно саму дату полностью новым значением.

					Объяснение №2. Если обнулять инпуты способом выше, мы обновим поля в существующей модели, на которую привязан новый пост. И пост будет пустым. поэтому, нодо обновлять ВСЮ модель. так мы добьемся разрыва связывания новосозданного поста с прошлой моделью

				*/

				this.post = {
					title: '',
					body: '',
				};
			},
		},
		watch: {
			// для эксперимента посмотрим, как работает вотчер с НЕ примитивами
			/* post(newValue) {
				console.log(newValue); // в консоль вывелся объект с пустыми полями, т.е вотчер отработал тогда, когда новый объект создался впервые, но на изменения не реагирует
				// тут нужно юзать глубокое отслеживание объекта. смотри ниже
			}, */
			post: {
				// убираем предупреждение о пустом поле, если инпуты не пустые
				handler() {
					console.log(this); // контекст - это весь объект со данными, методами, вотчерами и т.д.
					if (this.post.title) {
						this.emptyInputTitle = false;
					}
					if (this.post.body) {
						this.emptyInputBody = false;
					}
				},
				deep: true, //включаем глубокое отслеживание
			}, // теперь вотчер следит за каждым изменением объекта
		},
	};
</script>

<style lang="scss" scoped>
	form {
		display: flex;
		flex-direction: column;
	}
	.warning {
		color: rgba(245, 99, 99, 0.592);
	}
	.margin_btn {
		margin-top: 10px;
		width: 40%;
		height: 30px;
		align-self: center;
	}
</style>
