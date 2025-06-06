document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleAll');
    let expanded = false;

    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            const allDetails = document.querySelectorAll('details');
            expanded = !expanded;

            allDetails.forEach(detail => {
                if (expanded) {
                    detail.setAttribute('open', '');
                } else {
                    detail.removeAttribute('open');
                }
            });

            toggleButton.textContent = expanded ? 'Tout réduire' : 'Tout développer';
        });
    }

    // Ajouter une classe active au lien de navigation actuel
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    // Observer les sections pour l'intersection avec la fenêtre
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Scroll doux pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Augmenter la valeur du décalage pour tenir compte de la hauteur du header
                const headerOffset = 150;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Mise à jour de l'URL sans recharger la page
                history.pushState(null, null, targetId);
            }
        });
    });

    // Fonction pour créer un bouton de copie
    function createCopyButton(text) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-cmd-btn';
        copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/><path d="M5 5h6v1H5zm0 2h6v1H5zm0 2h3v1H5z"/></svg>';
        copyBtn.title = 'Copier la commande';
        
        // Add click event
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(text.trim())
                .then(() => {
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erreur de copie:', err);
                });
        });
        
        return copyBtn;
    }

    // Traiter les blocs de code avec structure pre>code
    document.querySelectorAll('pre > code').forEach(codeBlock => {
        // Créer un conteneur pour le bloc de code
        const container = document.createElement('div');
        container.className = 'code-container';
        codeBlock.parentNode.insertBefore(container, codeBlock);
        container.appendChild(codeBlock);
        
        // Ajouter aussi un bouton pour copier tout le bloc
        const blockCopyBtn = document.createElement('button');
        blockCopyBtn.className = 'copy-btn';
        blockCopyBtn.textContent = 'Copier';
        container.appendChild(blockCopyBtn);
        
        blockCopyBtn.addEventListener('click', function() {
            // Extraire seulement les commandes réelles (sans les commentaires)
            const lines = codeBlock.textContent.split('\n');
            const commandsOnly = lines.map(line => {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('#') && trimmedLine.includes(' ')) {
                    const parts = line.split('# ');
                    if (parts.length > 1) return parts[1].trim();
                }
                return '';
            }).filter(Boolean).join('\n');
            
            navigator.clipboard.writeText(commandsOnly)
                .then(() => {
                    blockCopyBtn.textContent = 'Copié !';
                    setTimeout(() => {
                        blockCopyBtn.textContent = 'Re-Copier';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erreur de copie:', err);
                    blockCopyBtn.textContent = 'Erreur';
                });
        });

        // Traiter le contenu du code pour identifier les commandes individuelles
        const codeText = codeBlock.textContent;
        const lines = codeText.split('\n');
        
        // Vider le bloc de code pour le reconstruire avec les boutons
        codeBlock.textContent = '';
        
        // Parcourir chaque ligne pour ajouter des boutons de copie aux commandes
        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            // Créer un élément div pour contenir la ligne de texte et le bouton de copie
            const lineDiv = document.createElement('div');
            lineDiv.className = 'code-line-container';
            
            // Si c'est une commande (commence par # mais pas un commentaire entier)
            if (trimmedLine.startsWith('#') && !trimmedLine.startsWith('#!') && trimmedLine.length > 1 && trimmedLine.includes(' ')) {
                // Extraire la commande (tout après le #)
                const commandParts = line.split('# ');
                if (commandParts.length > 1) {
                    const command = commandParts[1].trim();
                    
                    // Ajouter un bouton de copie si ce n'est pas une ligne vide ou commentaire
                    if (command.length > 0) {
                        // Créer le span pour le texte de la ligne
                        const lineText = document.createElement('span');
                        lineText.className = 'code-line';
                        lineText.textContent = line;
                        lineDiv.appendChild(lineText);
                        
                        // Ajouter le bouton à droite de la ligne
                        const copyBtn = createCopyButton(command);
                        lineDiv.appendChild(copyBtn);
                        
                        codeBlock.appendChild(lineDiv);
                    } else {
                        // Si c'est juste un commentaire sans commande
                        const lineSpan = document.createElement('span');
                        lineSpan.className = 'code-line';
                        lineSpan.textContent = line;
                        lineDiv.appendChild(lineSpan);
                        codeBlock.appendChild(lineDiv);
                    }
                } else {
                    const lineSpan = document.createElement('span');
                    lineSpan.className = 'code-line';
                    lineSpan.textContent = line;
                    lineDiv.appendChild(lineSpan);
                    codeBlock.appendChild(lineDiv);
                }
            } else {
                // Pour les lignes qui ne sont pas des commandes
                const lineSpan = document.createElement('span');
                lineSpan.className = 'code-line';
                lineSpan.textContent = line;
                lineDiv.appendChild(lineSpan);
                codeBlock.appendChild(lineDiv);
            }
            
            // Ajouter un saut de ligne sauf pour la dernière ligne
            if (index < lines.length - 1) {
                codeBlock.appendChild(document.createElement('br'));
            }
        });
    });
    
    // Traiter les blocs de code avec structure pre>code directement intégré
    document.querySelectorAll('pre > code:not(.code-container *)').forEach(codeElement => {
        const commandText = codeElement.textContent.trim();
        const copyBtn = createCopyButton(commandText);
        const wrapper = document.createElement('div');
        wrapper.className = 'code-line-container';
        
        // Remplacer l'élément code par le wrapper
        codeElement.parentNode.insertBefore(wrapper, codeElement);
        wrapper.appendChild(codeElement);
        wrapper.appendChild(copyBtn);
    });
    
    // Ajouter un bouton "Copier tout" pour chaque bloc pre qui n'en a pas encore
    document.querySelectorAll('pre:not(:has(.copy-btn))').forEach(preBlock => {
        if (!preBlock.querySelector('.copy-btn')) {
            const copyAllBtn = document.createElement('button');
            copyAllBtn.className = 'copy-btn';
            copyAllBtn.textContent = 'Copier tout';
            preBlock.style.position = 'relative';
            preBlock.appendChild(copyAllBtn);
            
            copyAllBtn.addEventListener('click', function() {
                // Collecter toutes les commandes du bloc
                const commands = [];
                preBlock.querySelectorAll('code').forEach(code => {
                    commands.push(code.textContent.trim());
                });
                
                navigator.clipboard.writeText(commands.join('\n'))
                    .then(() => {
                        copyAllBtn.textContent = 'Copié !';
                        setTimeout(() => {
                            copyAllBtn.textContent = 'Copier tout';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Erreur de copie:', err);
                        copyAllBtn.textContent = 'Erreur';
                    });
            });
        }
    });
});