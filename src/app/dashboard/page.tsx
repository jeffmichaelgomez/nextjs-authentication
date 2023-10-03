'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/styles/style.css';
import {
	faClipboardUser,
	faReceipt,
	faQuestionCircle,
	faAddressCard,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast"

export default function DashboardPage(){
	const router = useRouter()
    const [data, setData] = React.useState("")
    const logout = async () => {
        try{
           await axios.get('/api/users/logout')
            setLoading(true);
            toast.success("Logout Success");
            router.push("/login");
        }catch(error: any){
            console.log(error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/user');
        console.log(res.data.user.username)
        setData(res.data.user.username)
    }

	useEffect(() => {
		getUserDetails();
	}, []);

    const [loading, setLoading] = React.useState(false);

	return (
		<div>
			<div className="Sidebar">
				<header className="head"></header>

				<ul>
					<li>
						<a
							href="#"
							className="logo"
						>
							<Image
								src="/images/logo.png"
								width={50}
								height={50}
								alt="Picture of the author"
							/>
							<span className="nav-e">{loading ? "Processing ..." : "Employee"}</span>
						</a>
					</li>

					<li>
						<a href="/dashboard">
							<FontAwesomeIcon
								icon={faClipboardUser}
								className="fas"
							/>
							<span className="nav-item">Attendance</span>
						</a>
					</li>

					<li>
						<a href="/pdffunction">
							<FontAwesomeIcon
								icon={faReceipt}
								className="fas"
							/>
							<span className="nav-item">Payslip</span>
						</a>
					</li>

					<li>
						<a href="/201files">
							<FontAwesomeIcon
								icon={faQuestionCircle}
								className="fas"
							/>
							<span className="nav-item">201 files</span>
						</a>
					</li>

					<li>
						<a href="/aboutme">
							<FontAwesomeIcon
								icon={faAddressCard}
								className="fas"
							/>
							<span className="nav-item">About Me</span>
						</a>
					</li>

					<li>
						<a
							href="/logins"
							className="logout"
							onClick={(e) => {
								e.preventDefault();
								logout();
							}}
						>
							<FontAwesomeIcon
								icon={faRightFromBracket}
								className="fas"
							/>
							<span className="nav-item">Log-Out</span>
						</a>
					</li>
				</ul>
			</div>
			<div className="title">
				<h1>ATTENDANCE</h1>
			</div>

			<div className="position">
				<aside>
					<p className="compname">WB Majesty Marketing Corporation</p>
				</aside>
				<aside>
					<p>
						{' '}
						Name: <span>{data}</span>{' '}
					</p>
					<p> Employee ID: </p>
					<p> Position: </p>
				</aside>
			</div>
			<div className="outer">
				<div className="table-w">
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Time In</th>
								<th>Time Out</th>
							</tr>
						</thead>
						<tbody>{/* Add your table rows here */}</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
