import React from "react"

const AllCom = ({ d }) => {
    if (d.comments.length > 0) {
        return (
            <ul className='h-36 flex flex-col gap-2 w-full overflow-y-scroll mt-4 rounded-lg p-2 border border-sky-800 bg-[#212121]'>
                {d.comments.map((c) => {
                    return (
                        <li key={c._id} className='bg-bgbg p-2 rounded-lg w-full'>
                            <span className='flex justify-start items-center gap-2'>
                                <span className='h-8 w-8 bg-sky-400 text-xl text-center flex justify-center items-center font-bold rounded-full'>{c.id.name[0]}</span>
                                <span className='flex flex-col'>
                                    <h4 className='font-semibold'>{c.id.name}</h4>
                                    <h6 className='opacity-70'>@{c.id.handle}</h6>
                                </span>
                            </span>
                            <p>{c.content}</p>
                        </li>
                    )
                })}
            </ul>
        )
    } else {
        return <p>No Comments to show</p>
    }
}

export default AllCom
