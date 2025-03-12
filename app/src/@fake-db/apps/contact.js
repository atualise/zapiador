import GroupIcon from '@material-ui/icons/Group';
import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteIcon from '@material-ui/icons/Delete';

export const foldersList = [
  { id: 1, name: 'Contacts', slug: 'contacts', icon: <GroupIcon /> },
  { id: 2, name: 'Starred Contacts', slug: 'starred', icon: <StarIcon /> },
  { id: 3, name: 'Frequently Used', slug: 'frequent', icon: <AccessTimeIcon /> },
  { id: 6, name: 'Trash', slug: 'trash', icon: <DeleteIcon /> },
];

export const labelsList = [
  { id: 1, name: 'Banking', slug: 'banking', color: '#FF8C00' },
  { id: 2, name: 'Company', slug: 'company', color: '#00C4B4' },
  { id: 3, name: 'Payments', slug: 'payments', color: '#0F9AF7' },
];

export const contacts = [
  {
    id: 1457690400,
    name: 'Stella Johnson',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'stella.johnson@example.com',
    phones: [{ phone: '(215)-659-7529', label: 'home' }],
    designation: 'CEO',
    starred: false,
    frequent: true,
    company: 'TCS',
    labels: [2],
    folder: 'contacts',
  },
  {
    id: 1457690401,
    name: 'Garry Sobars',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'garry.sobars@example.com',
    phones: [{ phone: '(215)-659-7529', label: 'home' }],
    designation: 'CFO',
    starred: false,
    frequent: false,
    company: 'Infosys',
    labels: [2, 1],
    folder: 'contacts',
  },
  {
    id: 1457690402,
    name: 'Alex Dolgove',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'alex.dolgove@example.com',
    phones: [{ phone: '(215)-748-7855', label: 'home' }],
    designation: 'Designer',
    starred: false,
    frequent: false,
    company: 'Accenture',
    labels: [3],
    folder: 'contacts',
  },
  {
    id: 1457690403,
    name: 'Domnic Brown',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'domnic.brown@example.com',
    phones: [{ phone: '(215)-659-7529', label: 'home' }],
    designation: 'PHP Developer',
    starred: false,
    frequent: true,
    company: 'Pizza Hut',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690404,
    name: 'Kadir M',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'kadir.m@example.com',
    phones: [{ phone: '(215)-659-8965', label: 'home' }],
    designation: 'HR Manager',
    starred: true,
    frequent: false,
    company: 'Dominos',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690405,
    name: 'John Smith',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'john.smith@example.com',
    phones: [{ phone: '(215)-876-5434', label: 'home' }],
    designation: 'Marketing Head',
    starred: false,
    frequent: false,
    company: 'Subway',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690406,
    name: 'Domnic Harris',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'domnic.harris@example.com',
    phones: [{ phone: '(215)-659-7529', label: 'home' }],
    designation: 'BDO',
    starred: true,
    frequent: true,
    company: 'Honda',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690407,
    name: 'Jimmy Jo',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'jimmy.jo@example.com',
    phones: [{ phone: '(215)-456-2346', label: 'home' }],
    designation: 'CCO',
    starred: false,
    frequent: false,
    company: 'TVS',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690408,
    name: 'Jimmy Jon',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'jimmy.jon@example.com',
    phones: [{ phone: '(215)-278-4357', label: 'home' }],
    designation: 'Developer',
    starred: true,
    frequent: false,
    company: 'Hero',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690409,
    name: 'Jeson Born',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'jeson.born@example.com',
    phones: [{ phone: '(215)-286-0788', label: 'home' }],
    designation: 'UI-UX Designer',
    starred: false,
    frequent: false,
    company: 'Hyundai',
    labels: [],
    folder: 'trash',
  },
  {
    id: 1457690410,
    name: 'Steve Smith',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'steve.smith@example.com',
    phones: [{ phone: '(215)-586-4676', label: 'home' }],
    designation: 'CEO',
    starred: false,
    frequent: false,
    company: 'Maruti',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690500,
    name: 'Stella Johnson',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'stella.johnson@example.com',
    phones: [{ phone: '(215)-659-7529', label: 'home' }],
    designation: 'CEO',
    starred: false,
    frequent: true,
    company: 'Chevrolet',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690501,
    name: 'Garry Sobars',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'garry.sobars@example.com',
    phones: [{ phone: '(215)-745-2345', label: 'home' }],
    designation: 'CFO',
    starred: false,
    frequent: true,
    company: 'Morgan Garrage',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690502,
    name: 'Alex Dolgove',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'alex.dolgove@example.com',
    phones: [{ phone: '(215)-748-3265', label: 'home' }],
    designation: 'Designer',
    starred: false,
    frequent: false,
    company: 'Tata',
    labels: [],
    folder: 'trash',
  },
  {
    id: 1457690503,
    name: 'Domnic Brown',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'domnic.brown@example.com',
    phones: [{ phone: '(215)-756-3465', label: 'home' }],
    designation: 'PHP Developer',
    starred: false,
    frequent: true,
    Company: 'Levis',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690404,
    name: 'Kadir M',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'kadir.m@example.com',
    phones: [{ phone: '(215)-659-3246', label: 'home' }],
    designation: 'HR Manager',
    starred: true,
    frequent: false,
    company: 'John Players',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690505,
    name: 'John Smith',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'john.smith@example.com',
    phones: [{ phone: '(215)-876-3246', label: 'home' }],
    designation: 'Marketing Head',
    starred: false,
    frequent: false,
    company: 'Jaguar',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690506,
    name: 'Domnic Harris',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'domnic.harris@example.com',
    phones: [{ phone: '(215)-785-0967', label: 'home' }],
    designation: 'BDO',
    starred: true,
    frequent: false,
    company: 'Reliance',
    labels: [],
    folder: 'trash',
  },
  {
    id: 1457690507,
    name: 'Jimmy Jo',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'jimmy.jo@example.com',
    phones: [{ phone: '(215)-456-0677', label: 'home' }],
    designation: 'CCO',
    starred: false,
    frequent: false,
    company: 'Flipkart',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690508,
    name: 'Jimmy Jon',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'jimmy.jon@example.com',
    phones: [{ phone: '(215)-278-5475', label: 'home' }],
    designation: 'Developer',
    starred: true,
    frequent: false,
    company: 'Snapdeal',
    labels: [],
    folder: 'trash',
  },
  {
    id: 1457690509,
    name: 'Jeson Born',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'jeson.born@example.com',
    phones: [{ phone: '(215)-286-0456', label: 'home' }],
    designation: 'UI-UX Designer',
    starred: false,
    frequent: false,
    company: 'Amazon',
    labels: [],
    folder: 'contacts',
  },
  {
    id: 1457690510,
    name: 'Steve Smith',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    email: 'steve.smith@example.com',
    phones: [{ phone: '(215)-586-2355', label: 'home' }],
    designation: 'CEO',
    starred: false,
    frequent: false,
    company: 'Myntra',
    labels: [],
    folder: 'contacts',
  },
];
