import React from 'react'
import './HomeStatsComponent.css'
import { redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../../Utils/customFetch';
import { GiWeightScale } from "react-icons/gi";
import { CiLineHeight } from "react-icons/ci";
import { GiBiceps } from "react-icons/gi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoStatsChartOutline } from "react-icons/io5";
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export const loader = async () => {
    try {
      const { data } = await customFetch.get('/users/profile');
      return data;
    }catch (error) {
      console.log(error)
      return redirect('/');

    }
  }

const HomeStatsComponent = () => {
  const { user } = useLoaderData();
  

  // Edad del usuario
  const birthDate = new Date(user.birthDate)
  const actualDate = new Date()
  let age = actualDate.getFullYear() - birthDate.getFullYear();

  const monthDiff = actualDate.getMonth() - birthDate.getMonth();
  const dayDiff = actualDate.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // IMC del usuario

  const userWeight = user.weight
  const userHeight = (user.height / 100)

  let IMC = Math.round((userWeight/(userHeight*userHeight)))

    // Porcentaje de grasa segun el IMC (menos preciso)

    let BFP = 0
    if(user.gender = 'Masculino'){
    BFP = (1.20 * IMC) + (0.23 * age) - (10.8 * 1) -5.4

    }
    else{
    BFP = (1.20 * IMC) + (0.23 * age) - (10.8 * 0) -5.4
    }



// Masa magra (estimado)

let LBM = user.weight * (1 - (BFP/100))

  // Formula de Harris Benedict

  let Harris_TMB = 0
  let TotalHarris_TMB = 0
if (user.gender == 'Masculino') {
    Harris_TMB = Math.round((88.362 + (13.397 * userWeight) + (4.799 * user.height) - (5.677 * age)))
    if (user.pal === 'Extremadamente inactivo'){
        TotalHarris_TMB = Harris_TMB * 1.2
    }
    else if (user.pal === 'Sedentario'){
        TotalHarris_TMB = Harris_TMB * 1.375
    }
    else if( user.pal === 'Moderadamente activo'){
        TotalHarris_TMB = Harris_TMB * 1.55
    }
    else if (user.pal === 'Vigorosamente activo'){
        TotalHarris_TMB = Harris_TMB * 1.725
    }
    else{
        TotalHarris_TMB = Harris_TMB * 1.9
    }

    
}else{
    Harris_TMB = Math.round((447.593 + (9.247 * userWeight) + (3.098 * userHeight) - (4.330 * age)))
    if (user.pal === 'Extremadamente inactivo'){
        TotalHarris_TMB = Harris_TMB * 1.2
    }
    else if (user.pal === 'Sedentario'){
        TotalHarris_TMB = Harris_TMB * 1.375
    }
    else if( user.pal === 'Moderadamente activo'){
        TotalHarris_TMB = Harris_TMB * 1.55
        console.log('Calorias diarias = ', TotalHarris_TMB)
    }
    else if (user.pal === 'Vigorosamente activo'){
        TotalHarris_TMB = Harris_TMB * 1.725
    }
    else{
        TotalHarris_TMB = Harris_TMB * 1.9
    }
}

let userTotalCalories = 0
let harrisProtein = 0
let harrisFat = 0
let harrisCarbs = 0

if(user.goal === 'Perder peso'){
    userTotalCalories = TotalHarris_TMB - 500
    harrisProtein = 2.2 * user.weight
    harrisFat = (0.30 * userTotalCalories) / 9
    harrisCarbs = (userTotalCalories - ((harrisProtein * 4) + (0.30 * userTotalCalories))) / 4

}
else if (user.goal === 'Ganar musculo'){
    userTotalCalories = TotalHarris_TMB + 500
    harrisProtein = 1.8 * user.weight
    harrisFat = (0.25 * userTotalCalories) / 9
    harrisCarbs = (userTotalCalories - ((harrisProtein * 4) + (0.25 * userTotalCalories))) / 4
}
else {
    userTotalCalories = TotalHarris_TMB
    userTotalCalories = TotalHarris_TMB + 500
    harrisProtein = 2.0 * user.weight
    harrisFat = (0.30 * userTotalCalories) / 9
    harrisCarbs = (userTotalCalories - ((harrisProtein * 4) + (0.25 * userTotalCalories))) / 4
}


// Formula de Mifflin-St Jeor

let Mifflin_TMB = 0;

if(user.gender = 'Masculino'){
    Mifflin_TMB = (10 * user.weight) + (6.25 * user.height) - (5*age) + 5
}
else{
    Mifflin_TMB = (10 * user.weight) + (6.25 * user.height) - (5 * age) - 161
}


let CaloriesMifflin = 0
let mifflinProtein = 0
let mifflinFat = 0
let mifflinCarbs = 0

if(user.goal === 'Perder peso'){
    CaloriesMifflin = Mifflin_TMB - 500
    mifflinProtein = 2.2 * user.weight
    mifflinFat = (0.30 * CaloriesMifflin) / 9
    mifflinCarbs = (CaloriesMifflin - ((mifflinProtein * 4) + (0.30 * CaloriesMifflin))) / 4

}
else if (user.goal === 'Ganar musculo'){
    CaloriesMifflin = Mifflin_TMB + 500
    mifflinProtein = 1.8 * user.weight
    mifflinFat = (0.25 * CaloriesMifflin) / 9
    mifflinCarbs = (CaloriesMifflin - ((mifflinProtein * 4) + (0.25 * CaloriesMifflin))) / 4
}
else {
    CaloriesMifflin = Mifflin_TMB
    CaloriesMifflin = Mifflin_TMB + 500
    mifflinProtein = 2.0 * user.weight
    mifflinFat = (0.30 * CaloriesMifflin) / 9
    mifflinCarbs = (CaloriesMifflin - ((mifflinProtein * 4) + (0.25 * CaloriesMifflin))) / 4
}


// Formula de Katch-McArdle

let Katch_TMB = 370 + (21.6 * LBM)
let TotalKatch_TMB= 0

if (user.pal === 'Extremadamente inactivo'){
    TotalKatch_TMB = Katch_TMB * 1.2
}
else if (user.pal === 'Sedentario'){
    TotalKatch_TMB = Katch_TMB * 1.375
}
else if( user.pal === 'Moderadamente activo'){
    TotalKatch_TMB = Katch_TMB * 1.55
}
else if (user.pal === 'Vigorosamente activo'){
    TotalKatch_TMB = Katch_TMB * 1.725
}
else{
    TotalKatch_TMB = Katch_TMB * 1.9
}


let CaloriesKatch = 0
let katchProtein = 0
let katchFat = 0
let katchCarbs = 0

if(user.goal === 'Perder peso'){
    CaloriesKatch = TotalKatch_TMB - 500
    katchProtein = 2.2 * user.weight
    katchFat = (0.30 * CaloriesKatch) / 9
    katchCarbs = (CaloriesKatch - ((katchProtein * 4) + (0.30 * CaloriesKatch))) / 4

}
else if (user.goal === 'Ganar musculo'){
    CaloriesKatch = TotalKatch_TMB + 500
    katchProtein = 1.8 * user.weight
    katchFat = (0.25 * CaloriesKatch) / 9
    katchCarbs = (CaloriesKatch - ((katchProtein * 4) + (0.25 * CaloriesKatch))) / 4
}
else {
    CaloriesKatch = TotalKatch_TMB
    katchProtein = 2.0 * user.weight
    katchFat = (0.30 * CaloriesKatch) / 9
    katchCarbs = (CaloriesKatch - ((katchProtein * 4) + (0.30 * CaloriesKatch))) / 4
}

// Grafico de Harris

const data = [
    {
        name: 'Proteinas',
        uv: harrisProtein

    },
    {
        name: 'Grasas',
        uv: harrisFat
    },
    {
        name: 'Carbohidratos',
        uv: harrisCarbs
    }
]

// Grafico de Mifflin

const mifflinData = [

    { name: 'Proteinas', value: mifflinProtein},
    { name: 'Grasas', value: mifflinFat},
    { name: 'Carbohidratos', value: mifflinCarbs}

]

const COLORS = ['#0099ff'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
};


// Grafico de Katch

const katchData = [
    {
        subject: 'Proteinas',
        A: katchProtein
    },
    {
        subject: 'Grasas',
        A: katchFat
    },
    {
        subject:'Carbs',
        A: katchCarbs
    }
]


  return (
    <div className="stats-cotntainer">
        <div className="userData-container">
            <div className="userData-left-container">
                <div className="name-container">
                    <h2>{user.name}</h2><h2>{user.lastName}</h2>
                </div>
                <div className="data-container">
                    <LiaBirthdayCakeSolid size={20}/>
                    <p>Edad:</p><p>{age}</p>
                </div>
                <div className="data-container">
                    <GiWeightScale size={20}/>
                    <p>Peso:</p><p>{user.weight} kg</p>
                </div>
                <div className="data-container">
                    <CiLineHeight size={20}/>
                    <p>Altura:</p><p>{user.height} cm</p>
                </div>
                <div className="data-container">
                    <GiBiceps size={20}/>
                    <p>Masa Magra Estimada:</p><p>{Math.round(LBM)} kg</p>
                </div>
            </div>
            <div className="bfp-container">
                <div className="bfp-circle">
                    <svg>
                        <circle
                        cx="75"
                        cy="75"
                        r="65"
                        stroke="#e0e0e0"
                        strokeWidth="10"
                        fill="none"
                        ></circle>
                        <circle
                        cx="75"
                        cy="75"
                        r="65"
                        stroke="#0099ff"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                        style={{
                            strokeDasharray: `${2 * Math.PI * 70}`,
                            strokeDashoffset: `${(1 - BFP / 100) * 2 * Math.PI * 70}`,
                            transition: 'stroke-dashoffset 0.5s ease-in-out',
                        }}
                        ></circle>
                    </svg>
                </div>
                <div className="bfp-number">
                    <h2>{Math.round(BFP)}<span>%</span></h2>
                </div>
                <div className="bfp-title">
                    <h3>Porcentaje de Grasa Corporal</h3>
                </div> 
            </div>
            <div className="bmi-container">
                    <div className="desc-container">
                        <h4>Indice de Masa Corporal (BMI)</h4>
                        <h1>{Math.round(IMC)}</h1>
                        <IoStatsChartOutline size={65} color='#0099ff' className='person-icon'/>
                    </div>
                    <div className="class-container">
                        <div className="under-container">
                            <h4>Bajo Peso</h4>
                            <p>{'< 18.5'}</p>
                        </div>
                        <div className="normal-container">
                            <h4>Normal</h4>
                            <p>18.5 - 24.9</p>
                        </div>
                        <div className="over-container">
                            <h4>Sobrepeso</h4>
                            <p>25-29.9</p>
                        </div>
                        <div className="obese-container">
                            <h4>Obesidad</h4>
                            <p>≥ 30</p>
                        </div>
                 </div>
            </div>
        </div>
        <div className="calories-container">
            <div className="macros-container">
                <div className="author-container">
                    <h3>Harris Benedict</h3>
                </div>
                <div className="quantities-container">
                    <div className="labels-container">
                        <p>Calorias:</p>
                        <p>Proteinas:</p>
                        <p>Grasas:</p>
                        <p>Carbohidratos:</p>
                    </div>
                    <div className="values-container">
                        <p>{Math.round(TotalHarris_TMB)} kcal</p>
                        <p>{Math.round(harrisProtein)} g</p>
                        <p>{Math.round(harrisFat)} g</p>
                        <p>{Math.round(harrisCarbs)} g</p>
                    </div>
                </div>
                <div className="chart-container">
                    <ResponsiveContainer width={350} height={200}>
                        <BarChart data={data}>
                            <Bar dataKey="uv" fill="#0099ff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="macros-container">
                <div className="author-container">
                    <h3>Mifflin-St Jeor</h3>
                </div>
                <div className="quantities-container">
                    <div className="labels-container">
                        <p>Calorias:</p>
                        <p>Proteinas:</p>
                        <p>Grasas:</p>
                        <p>Carbohidratos:</p>
                    </div>
                    <div className="values-container">
                        <p>{Math.round(CaloriesMifflin)} kcal</p>
                        <p>{Math.round(mifflinProtein)} g</p>
                        <p>{Math.round(mifflinFat)} g</p>
                        <p>{Math.round(mifflinCarbs)} g</p>
                    </div>
                </div>
                <div className="chart-container">
                    <ResponsiveContainer width={350} height={200}>
                        <PieChart width={400} height={400}>
                        <Pie
                            data={mifflinData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {mifflinData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="macros-container">
                <div className="author-container">
                    <h3>Katch-McArdle</h3>
                </div>
                <div className="quantities-container">
                    <div className="labels-container">
                        <p>Calorias:</p>
                        <p>Proteinas:</p>
                        <p>Grasas:</p>
                        <p>Carbohidratos:</p>
                    </div>
                    <div className="values-container">
                        <p>{Math.round(CaloriesKatch)} kcal</p>
                        <p>{Math.round(katchProtein)} g</p>
                        <p>{Math.round(katchFat)} g</p>
                        <p>{Math.round(katchCarbs)} g</p>
                    </div>
                </div>
                <div className="chart-container">
                    <ResponsiveContainer width={365} height={250}>
                        <RadarChart cx="50%" cy="50%" outerRadius="85%" data={katchData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#0099ff" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

    </div>
  )
}

export default HomeStatsComponent