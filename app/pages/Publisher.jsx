
const Publisher = () => {

    const publisherData = [
        {
            "name": "প্রথমা প্রকাশন",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjmoQ3JFHIPiV3BYJYa8P7X1fDAuOSyMtH-g&s"
        },
        {
            "name": "অনুপম প্রকাশনী",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSAIrn5vPDlVJZObH1JvnEM_-dt4I_R2nS2w&s"
        },
        {
            "name": "পাঞ্জেরী পাবলিকেশন্স",
            "logo": "https://media.licdn.com/dms/image/v2/C510BAQE3iCIkWD3y3Q/company-logo_200_200/company-logo_200_200/0/1630607484798/panjeree_logo?e=2147483647&v=beta&t=fqIlJ45HWJ9zBluKfaUspFVW53SHAY2FU7ayaFCGgDQ"
        },
        {
            "name": "রাদুগা প্রকাশনী",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvvI6FmEyUqBbdcGWEZEcWLRmYqv3m5roRTw&s"
        },
        {
            "name": "মাওলা ব্রাদার্স",
            "logo": "https://upload.wikimedia.org/wikipedia/bn/c/cd/%E0%A6%AE%E0%A6%BE%E0%A6%93%E0%A6%B2%E0%A6%BE_%E0%A6%AC%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%A6%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%B8%E0%A7%87%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.webp"
        },
        {
            "name": "দিব্য প্রকাশ",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQrZYPZscgFiNlA4Q46JsIoUZKhhwqx56y6Q&s"
        },
        {
            "name": "অন্যপ্রকাশ",
            "logo": "https://baatighar.com/web/image/product.publisher/58/logo"
        },
        {
            "name": "সৃষ্টি প্রকাশন",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUpQTz6nCEvPunsPFrI2ceKHxC6KNbP5b9vA&s"
        },
        {
            "name": "আগামী প্রকাশনী",
            "logo": "https://publishers.com.bd/Image/Thumb/300/001/013/12304.png"
        },
        {
            "name": "জ্ঞানকোষ প্রকাশনী",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw6u9WI1_cRD74_Y2y_5Mk1tGF05xoBFqwlg&s"
        },
        {
            "name": "বইপত্র প্রকাশনী",
            "logo": "https://boierduniya.com/wp-content/uploads/2020/03/9b4cc8394dc4_619.jpg"
        },
        {
            "name": "সময় প্রকাশন",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDFzlzr7-FODZvRInYtbpuMjrX-NhvB-h5g&s"
        },
        {
            "name": "নালন্দা প্রকাশনী",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkz684Q93E3G_QVIEzS2BXev0VQMw5x_DXA&s"
        },
        {
            "name": "জাগৃতি প্রকাশনী",
            "logo": "https://ds.rokomari.store/rokomari110/company/9099df85d_109.png"
        },
        {
            "name": "বাংলা একাডেমি",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQ0cG4xGIb2VaMmuoE8AN4SEmJm2zVU6deA&s"
        }
    ]


    return (
        <div className="mx-5 my-5 font-mixed">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 ">
                {
                    publisherData.map(publisher => (
                        <div className="border-2 border-[#bbb] hover:border-[#003A5A] hover:duration-300 flex flex-col justify-center items-center gap-5 p-5">
                            <img className="w-40 h-40 border rounded-full" src={publisher.logo} alt="" />
                            <p className="text-xl hover:text-white">{publisher.name}</p>
                            <button className="btn w-52 bg-[#003A5A] text-white">View Details</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Publisher;