import { useTranslation } from "react-i18next";
import i18next from 'i18next';
const languages = [
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr',
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  }
]
function App() {
  const { t } = useTranslation();
  const releaseDate = new Date('2023-06-23');
  const timeDifference = new Date() - releaseDate;
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" style={{ marginTop: '5px' }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Select Language
          </button>
          <ul className="dropdown-menu">
            {languages.map(({ code, name, country_code }) => (
              <li key={country_code}>
                <button
                  className="dropdown-item"
                  onClick={() => i18next.changeLanguage(code)}
                >
                  <span
                    className={`flag-icon flag-icon-${country_code} mx-2`}
                    style={{
                      opacity: 0.7 ? 0.5 : 1,
                    }}
                  ></span>
                  {name}
                </button>
              </li>
            ))}

          </ul>
        </div>
      </div>
      <div className="d-flex flex-column align-items-start">
        <h1 className="font-weight-normal mb-3">{t('welcome_message')}</h1>
        <p>{t('days_since_release', { number_of_days })}</p>
      </div>
    </div>
  )
}

export default App;
