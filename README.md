# Personal Website - Khusni Ja'far

A modern, responsive personal website showcasing professional experience, skills, and projects.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Projects Section**: Showcase your work with screenshots and descriptions
- **Skills Display**: Organized skill categories with visual tags
- **Professional Experience**: Detailed work history with company information
- **Social Links**: Easy access to professional profiles

## Projects Section

The projects section displays your work with:
- **Project Screenshots**: Visual preview of each project
- **Project Titles**: Clear identification of each project
- **Descriptions**: Detailed explanations of project features and functionality
- **Technology Tags**: Shows the technologies used in each project
- **External Links**: Direct links to live projects or repositories

### Customizing Projects

1. **Add/Remove Projects**: Edit the HTML in the `#projects` section of `index.html`
2. **Update Images**: Replace the placeholder images in the `public/` folder with actual project screenshots
3. **Modify Content**: Update project titles, descriptions, and technology tags
4. **Add Links**: Update the `href` attributes in project links to point to actual project URLs

### Project Image Requirements

- **Size**: 400x220 pixels (16:9 aspect ratio)
- **Format**: JPG or PNG
- **Location**: Place in the `public/` folder
- **Naming**: Use descriptive names like `project-ecommerce.jpg`

### Generating Placeholder Images

If you need placeholder images for testing:
1. Open `create-placeholders.html` in your browser
2. Click the download buttons for each project type
3. Move the downloaded images to the `public/` folder

## File Structure

```
My Personal Website/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── script.js           # JavaScript functionality
├── public/             # Images and assets
│   ├── khusni-photo.jpg
│   ├── project-ecommerce.jpg
│   ├── project-dashboard.jpg
│   ├── project-mobile-app.jpg
│   └── project-portfolio.jpg
├── create-placeholders.html  # Tool to generate placeholder images
└── README.md           # This file
```

## Customization

### Colors
Edit the CSS variables in `style.css` to change the color scheme:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    /* ... other colors */
}
```

### Content
- Update personal information in `index.html`
- Modify work experience, skills, and education details
- Add or remove sections as needed

### Styling
- All styles are in `style.css`
- Responsive breakpoints are defined for mobile and tablet
- Animations and hover effects can be customized

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License. 