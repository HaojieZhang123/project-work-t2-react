import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const MobileFilterMenu = ({ categories, brands }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [expanded, setExpanded] = useState(false);

    const cat = searchParams.get('cat') || '';
    const brand = searchParams.get('brand') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const promo = searchParams.get('promo') || '';

    const show = true

    return show ? (
        <div className="mobile-filter-menu">
            <button className='toggle-filter-btn' onClick={() => setExpanded(!expanded)}>
                {expanded ? 'Hide Filters' : 'Show Filters'}
                <i className={`fa-solid fa-chevron-${expanded ? 'up' : 'down'} ms-2`}></i>
            </button>
            {expanded && (
                <div className="filter-scroll">
                    <div className="filter-item">
                        <label>Category</label>
                        <select value={cat} onChange={e => setSearchParams({
                            ...Object.fromEntries(searchParams.entries()),
                            cat: e.target.value
                        })}>
                            <option value="">All</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Brand</label>
                        <select value={brand} onChange={e => setSearchParams({
                            ...Object.fromEntries(searchParams.entries()),
                            brand: e.target.value
                        })}>
                            <option value="">All</option>
                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Price Min</label>
                        <input type="number" value={minPrice} min={0} onChange={e => setSearchParams({
                            ...Object.fromEntries(searchParams.entries()),
                            minPrice: e.target.value
                        })} />
                    </div>
                    <div className="filter-item">
                        <label>Price Max</label>
                        <input type="number" value={maxPrice} min={0} onChange={e => setSearchParams({
                            ...Object.fromEntries(searchParams.entries()),
                            maxPrice: e.target.value
                        })} />
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="discountCheck"
                            checked={promo === 'true'}
                            onChange={e => setSearchParams({
                                ...Object.fromEntries(searchParams.entries()),
                                promo: e.target.checked ? 'true' : ''
                            })}
                        />
                        <label className="form-check-label" htmlFor="discountCheck">
                            Promo
                        </label>
                    </div>
                </div>
            )}
        </div>
    ) : null;
};

export default MobileFilterMenu;