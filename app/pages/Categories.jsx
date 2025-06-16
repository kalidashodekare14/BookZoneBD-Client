import React from 'react';

const CategoriesPage = () => {

    const categoriesInfo = [
        {
            "id": "1",
            "name": "Fiction",
            "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
            "bookCount": 35
        },
        {
            "id": "2",
            "name": "Science",
            "image": "https://images.unsplash.com/photo-1532012197267-da84d127e765",
            "bookCount": 20
        },
        {
            "id": "3",
            "name": "History",
            "image": "https://img.drz.lazcdn.com/static/bd/p/07a422306b9e241780234c9e1dee3029.jpg_720x720q80.jpg",
            "bookCount": 18
        },
        {
            "id": "4",
            "name": "Biography",
            "image": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
            "bookCount": 22
        },
        {
            "id": "5",
            "name": "Fantasy",
            "image": "https://images.unsplash.com/photo-1544717302-de2939b7ef71",
            "bookCount": 27
        },
        {
            "id": "6",
            "name": "Technology",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475",
            "bookCount": 15
        },
        {
            "id": "7",
            "name": "Romance",
            "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
            "bookCount": 30
        },
        {
            "id": "8",
            "name": "Thriller",
            "image": "https://static.independent.co.uk/2024/03/08/17/p%20%20books.png?width=1200&height=1200&fit=crop",
            "bookCount": 19
        },
        {
            "id": "9",
            "name": "Self-Help",
            "image": "https://builtforathletes.com/cdn/shop/articles/Self_Help.jpg?v=1590478746",
            "bookCount": 25
        },
        {
            "id": "10",
            "name": "Children",
            "image": "https://hips.hearstapps.com/hmg-prod/images/best-childrens-kids-books-1599680383.jpg?crop=0.6236666666666667xw:1xh;center,top&resize=640:*",
            "bookCount": 16
        }
    ]

    return (
        <div className='mx-5 font-mixed'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-5'>
                {
                    categoriesInfo.map(category => (
                        <div className='relative w-full h-52 cursor-pointer rounded-2xl group'>
                            <img className='w-full h-52 relative z-10 rounded-2xl' src={category.image} alt="" />
                            <div className='absolute top-0 bg-[#00000093] group-hover:bg-[#00000052] group-hover:duration-300 w-full h-full z-20 rounded-2xl'></div>
                            <h1 className='absolute z-30 top-[40%] left-[40%] text-white text-2xl group-hover:bg-black group-hover:duration-300 p-2 rounded-xl'>{category.name}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CategoriesPage;