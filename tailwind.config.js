// Build once:  npx tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o assets/tailwind.css --minify
// Then in every .html file replace the cdn.tailwindcss.com <script> and the inline tailwind.config <script> with:
//   <link rel="stylesheet" href="assets/tailwind.css">
module.exports = {
  content: ['./*.html'],
  theme: {
        extend: {
            fontFamily: {
                sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            },
            colors: {
                alabaster: '#F8FAFC',
                obsidian: '#0F172A',
                amber: {
                    500: '#F59E0B',
                    600: '#D97706',
                    700: '#B45309',
                }
            }
        }
    }
};
