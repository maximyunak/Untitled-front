/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customPurple: '#8b74ff', // You can add your desired color code here
      },
      transitionDuration: {
        default: '3000ms', // Добавляем кастомное значение
      },
    },
  },
  plugins: [],
};
