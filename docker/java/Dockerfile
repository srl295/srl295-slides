# builds srl295/icu-demo:fedora-j
#docker build https://github.com/unicode-org/icu-docker.git#icu4j-coverity:dockerfiles/fedora-j -t srl295/icu-build:fedora-j
FROM srl295/icu-build:fedora-j
LABEL maintainer="Steven R. Loomis <srl295@gmail.com>"
# add a couple things
USER root
RUN dnf -q -y install maven emacs-nox
# back to you.
USER build
