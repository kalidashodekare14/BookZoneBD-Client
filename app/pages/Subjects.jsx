const SubjectsPage = () => {

    const subjectInfo = [
        {
            "subject": "Literature",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdBTRu5sauZmwEDLlrU4K4rtsvJ_9adaTSXg&s"
        },
        {
            "subject": "Science",
            "image": "https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2022/12/2022FavBookCovers.jpg"
        },
        {
            "subject": "Mathematics",
            "image": "https://abakcus.com/wp-content/uploads/2023/12/10-Must-Read-Books-on-Mathematics-History-1536x1024.jpg"
        },
        {
            "subject": "History",
            "image": "https://th-thumbnailer.cdn-si-edu.com/t9PDr5xjffZreNUjP0GSGpi2ors=/fit-in/1600x0/filters:focal(800x602:801x603)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/83/92/83928011-d1c8-4559-8916-da5ee9174bc5/booklist-2023-history.jpg"
        },
        {
            "subject": "Computer Science",
            "image": "https://miro.medium.com/v2/resize:fit:1400/1*hATrZKA8SEHzRqSIUyMXew.jpeg"
        },
        {
            "subject": "Religion",
            "image": "https://i0.wp.com/sheseeksnonfiction.blog/wp-content/uploads/2021/10/20.7.12-28-books-every-atheist-should-read.jpg?fit=2000%2C900&ssl=1"
        },
        {
            "subject": "Self Development",
            "image": "https://bhumika.com.bd/public/uploads/all/zofQVKG2yhRxXptwEuegEMnx7jCwNDJ1CH3O5gES.jpg"
        },
        {
            "subject": "Biology",
            "image": "https://bhumika.com.bd/public/uploads/all/zofQVKG2yhRxXptwEuegEMnx7jCwNDJ1CH3O5gES.jpg"
        },
        {
            "subject": "Economics",
            "image": "https://img.readthistwice.com/unsafe/lists/best-biology-books-870a32c8da.png"
        },
        {
            "subject": "Geography",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWzjpG7C2gX9DboRZEyU73mZTturCrQKlzbA&s"
        }
    ]


    return (
        <div className='mx-5 font-mixed'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-5'>
                {
                    subjectInfo.map(category => (
                        <div className='relative w-full h-52 cursor-pointer rounded-2xl group'>
                            <img className='w-full h-52 relative z-10 rounded-2xl' src={category.image} alt="" />
                            <div className='absolute top-0 bg-[#000000a8] group-hover:bg-[#00000052] group-hover:duration-300 w-full h-full z-20 rounded-2xl'></div>
                            <h1 className='absolute z-30 top-[40%] left-[40%] text-white text-2xl'>{category.subject}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SubjectsPage;