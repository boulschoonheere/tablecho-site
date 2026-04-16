# INFRASTRUCTURE VPS HOSTINGER — CONTEXTE PARTAGÉ
# Dernière mise à jour : 16 avril 2026

## SERVEUR
- Hébergeur : Hostinger
- Plan : KVM 2 (upgrade effectué le 16/04/2026, expire le 15/04/2027)
- Ressources : 2 vCPU, 8 Go RAM, 100 Go NVMe, 8 To bande passante
- OS : Ubuntu 24.04
- Localisation : Germany - Frankfurt
- IP : 72.61.23.140
- Hostname : srv1496863.hstgr.cloud
- Accès SSH : ssh root@72.61.23.140
- Accès hPanel : hpanel.hostinger.com/vps/1496863/overview
- Terminal web : bouton "Terminal" depuis la page Overview

## DOCKER — SERVICES INSTALLÉS
Tous les services tournent en Docker sur le réseau n8n_default et sont exposés via Traefik (reverse proxy + SSL Let's Encrypt automatique).

| Service | URL | Conteneur | Port interne | Rôle |
|---|---|---|---|---|
| n8n | https://n8n.srv1496863.hstgr.cloud | n8n-n8n-1 | 5678 | Automatisation workflows |
| Traefik | — | n8n-traefik-1 | 80/443 | Reverse proxy + SSL auto |
| Uptime Kuma | https://uptime.srv1496863.hstgr.cloud | uptime-kuma | 3001 | Monitoring services + alertes |
| Portainer | https://portainer.srv1496863.hstgr.cloud | portainer | 9000 | Interface graphique Docker |

## EMPLACEMENTS DES FICHIERS
- Config n8n : /docker/n8n/docker-compose.yml + /docker/n8n/.env
- Config monitoring : /docker/monitoring/docker-compose.yml
- Certificats SSL Traefik : volume Docker traefik_data
- Données n8n : volume Docker n8n_data

## AJOUTER UN NOUVEAU SERVICE DERRIÈRE TRAEFIK
Labels Docker à appliquer :

```yaml
labels:
  - traefik.enable=true
  - traefik.http.routers.<nom>.rule=Host(`<sous-domaine>.srv1496863.hstgr.cloud`)
  - traefik.http.routers.<nom>.tls=true
  - traefik.http.routers.<nom>.entrypoints=web,websecure
  - traefik.http.routers.<nom>.tls.certresolver=mytlschallenge
  - traefik.http.services.<nom>.loadbalancer.server.port=<port_interne>
networks:
  - n8n_default
```

Le réseau n8n_default doit être déclaré en external: true.

## SERVICES PRÉVUS MAIS PAS ENCORE INSTALLÉS
- FastAPI proxy HygiènePro (relay Claude API + webhooks Stripe)
- Backend FastAPI Tablecho
- Backend FastAPI Lead Quiz Hub (ACDC)
- PostgreSQL (pour Tablecho uniquement ; HygiènePro reste sur Supabase cloud)

## BUDGET RAM DISPONIBLE
Consommation actuelle : ~1 Go. Marge disponible : ~7 Go.

## RÈGLES ABSOLUES
- Ne JAMAIS toucher au conteneur n8n-n8n-1 ni au docker-compose /docker/n8n/ sans confirmation explicite (production)
- Ne JAMAIS modifier Traefik sans confirmation (casse tous les SSL)
- Tout nouveau service doit rejoindre le réseau n8n_default et suivre le pattern Traefik ci-dessus
- Sauvegardes Hostinger hebdomadaires incluses ; pas de daily backup payant activé
- Pas de pare-feu configuré au niveau VPS (à revoir avant production réelle)

## À VÉRIFIER / À FAIRE
- Configurer notifications Uptime Kuma (Telegram ou email)
- Ajouter sondes Uptime Kuma pour tous les services
- Mettre en place un pare-feu UFW avant d'ouvrir de nouveaux ports
- Investiguer le taux d'échec de 52% sur n8n au 16/04/2026
- Désactiver auto-renewal Hostinger avant avril 2027 pour renouveler à tarif promo
