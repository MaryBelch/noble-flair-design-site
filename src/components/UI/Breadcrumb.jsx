import { useTranslation } from '../../context/I18nContext';
import { useLocation, NavLink } from 'react-router-dom';

export default function Breadcrumb() {
  const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname;

  // Define breadcrumb items for different paths
  let breadcrumbItems = [];

  // Home is always the first item
  breadcrumbItems.push({
    label: t('nav.home'),
    path: '/',
    isCurrent: false
  });

  // Handle different paths
  if (path.startsWith('/blog/')) {
    // Blog post page
    const postId = path.split('/')[2];
    // In a real implementation, we would fetch the post title from data
    // For now, we'll use a generic label
    breadcrumbItems.push(
      { label: t('nav.blog'), path: '/blog', isCurrent: false },
      { label: t('blog.title'), path: path, isCurrent: true }
    );
  } else if (path.startsWith('/portfolio/')) {
    // Portfolio item page
    const itemId = path.split('/')[2];
    breadcrumbItems.push(
      { label: t('nav.portfolio'), path: '/portfolio', isCurrent: false },
      { label: t('portfolio.title'), path: path, isCurrent: true }
    );
  } else if (path === '/blog') {
    // Blog listing page
    breadcrumbItems.push(
      { label: t('nav.blog'), path: '/blog', isCurrent: true }
    );
  } else if (path === '/portfolio') {
    // Portfolio listing page
    breadcrumbItems.push(
      { label: t('nav.portfolio'), path: '/portfolio', isCurrent: true }
    );
  } else if (path === '/services') {
    // Services page
    breadcrumbItems.push(
      { label: t('nav.services'), path: '/services', isCurrent: true }
    );
  } else if (path === '/course') {
    // Course page
    breadcrumbItems.push(
      { label: t('nav.course'), path: '/course', isCurrent: true }
    );
  } else if (path === '/about') {
    // About page
    breadcrumbItems.push(
      { label: t('nav.about'), path: '/about', isCurrent: true }
    );
  } else if (path === '/founder') {
    // Founder page
    breadcrumbItems.push(
      { label: t('nav.founder'), path: '/founder', isCurrent: true }
    );
  } else if (path === '/testimonials') {
    // Testimonials page
    breadcrumbItems.push(
      { label: t('nav.testimonials'), path: '/testimonials', isCurrent: true }
    );
  } else if (path === '/faq') {
    // FAQ page
    breadcrumbItems.push(
      { label: t('nav.faq'), path: '/faq', isCurrent: true }
    );
  } else if (path === '/vacancies') {
    // Vacancies page
    breadcrumbItems.push(
      { label: t('nav.vacancies'), path: '/vacancies', isCurrent: true }
    );
  } else if (path === '/contact') {
    // Contact page
    breadcrumbItems.push(
      { label: t('nav.contact'), path: '/contact', isCurrent: true }
    );
  } else if (path === '/admin') {
    // Admin page
    breadcrumbItems.push(
      { label: t('nav.admin'), path: '/admin', isCurrent: true }
    );
  } else if (path === '/') {
    // Home page
    breadcrumbItems[0].isCurrent = true;
  }

  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <ol className="breadcrumb__list">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className={`breadcrumb__item${item.isCurrent ? ' breadcrumb__item--current' : ''}`}>
            {item.isCurrent ? (
              <span className="breadcrumb__current">{item.label}</span>
            ) : (
              <NavLink to={item.path} className="breadcrumb__link">
                {item.label}
              </NavLink>
            )}
            {!item.isCurrent && index < breadcrumbItems.length - 1 && (
              <span className="breadcrumb__separator">→</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}