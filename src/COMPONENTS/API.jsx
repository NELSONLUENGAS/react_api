import { useState, useEffect } from 'react';

export const API = () => {
	// Requiriment 3
	const [memoria, setMemoria] = useState([]);
	const [llenarDeNuevo, setllenarDeNuevo] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			copiandoPlaylist();
		}, 8000);
	}, [llenarDeNuevo]);

	const copiandoPlaylist = async () => {
		const productsJson = await fetch('https://fakestoreapi.com/products'); //CONSULTANDO LA PLAYLIST
		const productsData = await productsJson.json();

		// Limpiando los datos que necesitamos de la API R.1
		const dataFiltered = productsData.map((element) => {
			const { id, title, image } = element;

			return {
				id,
				title,
				image,
			};
		});

		setMemoria(dataFiltered);
		setllenarDeNuevo(false);

		console.log('Copiando play list....😀');
	};

	const handleOnClick = () => {
		setMemoria([]); //Borrar memoria
		setllenarDeNuevo(true); // Volver a guardar la playlist
	};

	const handleOnSort = () => {
		const dataOrdered = memoria.sort((a, b) =>
			a?.title.localeCompare(b?.title)
		);

		console.log(dataOrdered, 'data Ordered');
	};

	return (
		<>
			<div>
				<h1>Hola soy FAKESTORE API</h1>
				<button onClick={handleOnClick}>Cargar otra PLAYLIST</button>
				<button onClick={handleOnSort}>Ordenar por titulo</button>
				<hr />
				{memoria.length ? (
					memoria.map((product, key) => (
						<div key={key}>
							<h3>{product.title}</h3>
							<figure style={{ width: '200px' }}>
								<img
									src={product.image}
									alt="image"
									style={{ width: '100%' }}
								/>
							</figure>
						</div>
					))
				) : (
					<h1>Espera estoy consultando tu música favorita....</h1>
				)}
			</div>
		</>
	);
};
