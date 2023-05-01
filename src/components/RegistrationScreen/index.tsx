import React, { useEffect, useState } from 'react'
import { Table, Modal } from 'antd';
import axios from '../../Axios/axios';
import './style.css'
const RegistrationScreen = () => {
    const [dataSource, setDataSource] = useState()
    const [category, setCategories] = useState([])
    const [newCar, setNewCar] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Model',
            dataIndex: 'Model',
            key: 'Model',
        },
        {
            title: 'Color',
            dataIndex: 'Color',
            key: 'Color',
        }
        ,
        {
            title: 'Reg',
            dataIndex: 'Reg',
            key: 'Reg',
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            key: 'Category',
        },

    ];

    const getRegisterCars = async () => {
        const loggedUser = await JSON.parse(localStorage.getItem('loginuser') || '{}')
        console.log(loggedUser)
        axios
            .get(
                'cars/getcars',

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${loggedUser.token}`
                    }
                }
            ).then(data => {
                console.log(data)
                const cars = data.data.data?.map(item => {
                    return { ...item, Category: item?.Category.Name }
                })
                setDataSource(cars)

            })
            .catch(err => {
                // setDataSource([])
            })
        axios
            .get(
                'category/getcategories',

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${loggedUser.token}`
                    }
                }
            ).then(data => {
                console.log(data)
                const cars = data.data.data?.map(item => {
                    return { ...item }
                })
                setCategories(cars)

            })
            .catch(err => {
                // setDataSource([])
            })
    }

    useEffect(() => {
        getRegisterCars()
    }, [])

    return (
        <div>
            <div className='Header-container'><p>Registration Screen</p><button onClick={() => {
                setOpenModal(true)

            }}>Add New Car</button></div>
            <Modal
                open={openModal}
                title="Add a Car"
                onOk={() => { }}
                onCancel={() => { }}
                footer={[
                    <button key="back" onClick={() => {

                    }}>
                        Add Car
                    </button>
                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Table dataSource={dataSource} columns={columns} />

        </div>
    )
}

export default RegistrationScreen
