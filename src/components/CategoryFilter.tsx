import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className={styles.filterContainer}>
      <button 
        className={`${styles.tab} ${selected === '전체' ? styles.active : ''}`}
        onClick={() => onSelect('전체')}
      >
        전체
      </button>
      {categories.map(cat => (
        <button 
          key={cat}
          className={`${styles.tab} ${selected === cat ? styles.active : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
