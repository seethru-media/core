export default function AuthorDashboard() {
    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <h1>Author Dashboard</h1>
            <p style={{ color: '#666', marginTop: '1rem' }}>
                Welcome to the seethru.media author portal.
            </p>

            <nav style={{ marginTop: '2rem' }}>
                <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
                    <li>
                        <a href="/new" style={{ color: 'var(--color-primary)' }}>
                            New Post
                        </a>
                    </li>
                    <li>
                        <a href="/drafts" style={{ color: 'var(--color-primary)' }}>
                            Drafts
                        </a>
                    </li>
                    <li>
                        <a href="/published" style={{ color: 'var(--color-primary)' }}>
                            Published
                        </a>
                    </li>
                </ul>
            </nav>

            <section style={{ marginTop: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem' }}>Recent Drafts</h2>
                <p style={{ color: '#666', fontStyle: 'italic', marginTop: '1rem' }}>
                    No drafts yet. Start writing!
                </p>
            </section>
        </main>
    );
}
