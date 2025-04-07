import React, { useEffect, useState, useRef } from 'react';
import { Character, fetchCharacters } from '../../api/swapi';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import Modal from '../../components/modal/Modal';
import Filter, { FilterOption } from '../../components/filter/Filter';
import Pagination from '../../components/pagination/Pagination';
import './Characters.css';

interface CharactersProps {
  language: 'en' | 'wookiee';
}

const Characters: React.FC<CharactersProps> = ({ language }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filtered, setFiltered] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Character | null>(null);
  const [filterValue, setFilterValue] = useState<FilterOption>('all');
  const loadedPagesRef = useRef<Set<string>>(new Set());
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCharacters([]);
    setFiltered([]);
    setTotal(0);
    setCurrentPage(1);
    loadedPagesRef.current.clear();
  }, [language]);

  useEffect(() => {
    loadPage(currentPage, language);
  }, [currentPage, language]);

  const loadPage = async (page: number, lang: 'en' | 'wookiee') => {
    const key = `${page}-${lang}`;
    if (loadedPagesRef.current.has(key)) return;
    loadedPagesRef.current.add(key);
    setLoading(true);
    try {
      const data = await fetchCharacters(page, lang);
      setTotal(data.count);
      setCharacters((prev) => [...prev, ...data.results]);
      setFiltered((prev) => [...prev, ...data.results]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filterValue === 'all') {
      setFiltered(characters);
    } else {
      setFiltered(characters.filter((ch) => ch.gender === filterValue));
    }
  }, [filterValue, characters]);

  const displayed = filtered.slice(0, currentPage * 9);
  const allLoaded = displayed.length >= total;

  const handleLoadMore = () => {
    const oldCount = displayed.length;
    setCurrentPage((p) => p + 1);
    setTimeout(() => {
      if (!listRef.current) return;
      const cards = listRef.current.children;
      if (cards.length > oldCount) {
        const firstNewCard = cards[oldCount] as HTMLElement;
        firstNewCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const [showScrollUp, setShowScrollUp] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowScrollUp(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const titleEn = `${total} Peoples for you to choose your favorite`;
  const titleWookiee = 'rcwochuanaoc scra...';
  const displayedTitle = language === 'wookiee' ? titleWookiee : titleEn;

  return (
    <div className='characters'>
      <div className='characters__header'>
        <h2 className='characters__title'>{displayedTitle}</h2>
        <div className='characters__filter'>
          <Filter
            options={['all', 'male', 'female', 'n/a']}
            value={filterValue}
            onChange={setFilterValue}
            language={language}
          />
        </div>
      </div>

      <div className='characters__list' ref={listRef}>
        {displayed.map((ch, i) => (
          <Card key={i} character={ch} language={language} onClick={() => setSelected(ch)} />
        ))}
      </div>

      {loading && <Loader />}

      <Pagination onLoadMore={handleLoadMore} disabled={allLoaded || loading} language={language} />

      {selected && <Modal character={selected} language={language} onClose={() => setSelected(null)} />}

      {showScrollUp && (
        <button className='scroll-to-top show' onClick={handleScrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Characters;
