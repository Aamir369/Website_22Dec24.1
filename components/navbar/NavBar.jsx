import Link from 'next/link'
import Image from 'next/image'
 

function NavBar() {
	return (
		<nav className="fixed top-0 left-0 w-full bg-slate-50 bg-opacity-75 text-white p-4 z-50">
            <div className="container mx-auto flex justify-between items-center "> 
                <a href="/" className="z-index: -inset-5" ><Image src="/video/fulllogo_transparent.png" width={250} height={10} alt="Picture"/></a>
                <ul className="flex space-x-4 px-9">
                    <li><a href="/" className="hover:text-gray-800 text-black font-bold text-xl">Home</a></li>
                    <li><a href="/signIn" className="hover:text-gray-800 text-black font-bold text-xl bg-slate-500 py-2 px-2">Registered Users SignIn</a></li>
                    {/*<li><a href="/registered-users" className="hover:text-gray-800 text-black font-bold text-xl">Registered Users</a></li>*/}
                    {/*<li><a href="/signup" className="hover:text-gray-800 text-black font-bold text-xl ">Sign Up</a></li>*/}
                    <li><a href="/about" className="hover:text-gray-800 text-black font-bold text-xl">About Us</a></li>
                    <li><a href="/contactUs" className="hover:text-gray-800 text-black font-bold text-xl">Contact Us</a></li>
                </ul>
            </div>
        </nav>
	)
}

export {NavBar}
