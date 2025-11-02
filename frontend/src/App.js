import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [clients, setClients] = useState([]);
  const [deals, setDeals] = useState([]);
  const [activeTab, setActiveTab] = useState('clients');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Загружаем данные при запуске
    fetchData();
  }, []);

  // Загрузка всех данных
  const fetchData = async () => {
    setLoading(true);
    setError('');
    
    try {
      await Promise.all([
        fetchClients(),
        fetchDeals()
      ]);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка клиентов из API
const fetchClients = async () => {
  try {
    console.log('🔄 Загрузка клиентов...');
    const response = await fetch('http://127.0.0.1:8000/api/clients/', {
      credentials: 'include',  // ← ДОБАВЬТЕ ЭТУ СТРОКУ
    });
    
    console.log('📊 Статус ответа клиентов:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Клиенты загружены:', data);
      setClients(data);
      return data;
    } else {
      console.log('❌ Ошибка клиентов:', response.status);
      setClients([]);
      return [];
    }
  } catch (error) {
    console.error('🌐 Ошибка сети клиентов:', error);
    setClients([]);
    return [];
  }
};

// Загрузка сделок из API
const fetchDeals = async () => {
  try {
    console.log('🔄 Загрузка сделок...');
    const response = await fetch('http://127.0.0.1:8000/api/deals/', {
      credentials: 'include',  // ← ДОБАВЬТЕ ЭТУ СТРОКУ
    });
    
    console.log('📊 Статус ответа сделок:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Сделки загружены:', data);
      setDeals(data);
      return data;
    } else {
      console.log('❌ Ошибка сделок:', response.status);
      setDeals([]);
      return [];
    }
  } catch (error) {
    console.error('🌐 Ошибка сети сделок:', error);
    setDeals([]);
    return [];
  }
};

  // Функция для красивого отображения этапов сделки
  const getStageName = (stage) => {
    const stages = {
      'lead': '🟡 Лид',
      'contact': '🔵 Контакт',
      'proposal': '🟣 Предложение',
      'negotiation': '🟠 Переговоры',
      'won': '✅ Успех',
      'lost': '❌ Потерян'
    };
    return stages[stage] || stage;
  };

  // Обновление данных
  const handleRefresh = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="loading">
        <div>🔄 Загрузка данных...</div>
        <p>Проверьте, что Django сервер запущен на http://127.0.0.1:8000</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Моя CRM система</h1>
        <div className="header-controls">
          <nav>
            <button 
              className={activeTab === 'clients' ? 'active' : ''}
              onClick={() => setActiveTab('clients')}
            >
              📋 Клиенты ({clients.length})
            </button>
            <button 
              className={activeTab === 'deals' ? 'active' : ''}
              onClick={() => setActiveTab('deals')}
            >
              💼 Сделки ({deals.length})
            </button>
          </nav>
          <button className="refresh-btn" onClick={handleRefresh}>
            🔄 Обновить
          </button>
        </div>
      </header>

      <main>
        {error && (
          <div className="error-message">
            ⚠️ {error}
            <br />
            <small>Убедитесь, что бэкенд Django запущен на порту 8000</small>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="tab-content">
            <h2>📋 Список клиентов</h2>
            {clients.length === 0 ? (
              <div className="empty-state">
                <p>📭 Клиентов пока нет</p>
                <p>Добавьте клиентов через админку Django</p>
                <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer">
                  📊 Перейти в админку
                </a>
              </div>
            ) : (
              <div className="clients-list">
                {clients.map(client => (
                  <div key={client.id} className="client-card">
                    <h3>{client.name}</h3>
                    <p>📧 {client.email}</p>
                    <p>📞 {client.phone}</p>
                    <p>🏢 {client.company || 'Не указана'}</p>
                    <span className={`status ${client.status}`}>
                      {client.status === 'active' ? '✅ Активный' : '❌ Неактивный'}
                    </span>
                    <p className="date">📅 Добавлен: {new Date(client.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="tab-content">
            <h2>💼 Список сделок</h2>
            {deals.length === 0 ? (
              <div className="empty-state">
                <p>📭 Сделок пока нет</p>
                <p>Добавьте сделки через админку Django</p>
                <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer">
                  📊 Перейти в админку
                </a>
              </div>
            ) : (
              <div className="deals-list">
                {deals.map(deal => (
                  <div key={deal.id} className="deal-card">
                    <h3>{deal.title}</h3>
                    <p>👤 Клиент: {deal.client_name || deal.client}</p>
                    <p>💰 Сумма: {deal.amount} руб.</p>
                    <p>📊 Этап: {getStageName(deal.stage)}</p>
                    <p>🎯 Вероятность: {deal.probability}%</p>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{width: `${deal.probability}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;